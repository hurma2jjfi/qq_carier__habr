const db = require('../config/db.config');


// Исправленный quiz.controller.js
exports.getQuizQuestions = async (req, res) => {
  const quizId = req.params.quizId;

  try {
    // Получаем вопросы
    const [questions] = await db.query(
      'SELECT id, question_text, question_order FROM questions WHERE quiz_id = ? ORDER BY question_order ASC',
      [quizId]
    );

    if (questions.length === 0) {
      return res.status(404).json({ success: false, message: 'Вопросы не найдены' });
    }

    // Получаем ответы для всех вопросов (включая is_correct)
    const questionIds = questions.map(q => q.id);
    const [answers] = await db.query(
      `SELECT id, question_id, answer_text, is_correct FROM answers WHERE question_id IN (?)`,
      [questionIds]
    );

    // Группируем ответы по вопросам
    const questionsWithAnswers = questions.map(q => ({
      ...q,
      answers: answers.filter(a => a.question_id === q.id)
    }));

    res.json({ success: true, questions: questionsWithAnswers });
  } catch (error) {
    console.error('Ошибка получения вопросов:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.submitQuizAnswers = async (req, res) => {
  const { userId, quizId, answers } = req.body;

  if (!userId || !quizId || !Array.isArray(answers)) {
    return res.status(400).json({ success: false, message: 'Некорректные данные' });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Создаем запись попытки
    const [result] = await connection.query(
      'INSERT INTO user_quiz_submissions (user_id, quiz_id, started_at, status) VALUES (?, ?, NOW(), ?)',
      [userId, quizId, 'completed']
    );

    const submissionId = result.insertId;

    // Вставляем ответы пользователя и проверяем их правильность
    for (const ans of answers) {
      // Получаем информацию о правильности ответа
      const [answerData] = await connection.query(
        'SELECT is_correct FROM answers WHERE id = ?',
        [ans.answerId]
      );
      
      const isCorrect = answerData[0]?.is_correct || false;

      await connection.query(
        'INSERT INTO user_answers (submission_id, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)',
        [submissionId, ans.questionId, ans.answerId, isCorrect]
      );
    }

    // Подсчитываем количество правильных ответов
    const [correctAnswers] = await connection.query(
      `SELECT COUNT(*) AS correctCount
       FROM user_answers
       WHERE submission_id = ? AND is_correct = TRUE`,
      [submissionId]
    );

    const correctCount = correctAnswers[0].correctCount;
    const total = answers.length;
    const incorrectCount = total - correctCount;

    // Обновляем результат
    await connection.query(
      'UPDATE user_quiz_submissions SET score = ?, finished_at = NOW() WHERE id = ?',
      [correctCount, submissionId]
    );

    await connection.commit();

    res.json({ 
      success: true, 
      score: correctCount, 
      incorrect: incorrectCount, 
      total 
    });
  } catch (error) {
    await connection.rollback();
    console.error('Ошибка сохранения ответов:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  } finally {
    connection.release();
  }
};
