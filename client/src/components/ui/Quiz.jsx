import React, { useState, useEffect, useRef } from 'react';

const Quiz = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 минут в секундах
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/${quizId}/questions`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Приводим is_correct и id к числам
          const questionsWithBool = data.questions.map(q => ({
            ...q,
            id: Number(q.id),
            answers: q.answers.map(a => ({
              ...a,
              id: Number(a.id),
              is_correct: Number(a.is_correct) === 1,
            })),
          }));
          console.log('Загружены вопросы:', questionsWithBool);
          setQuestions(questionsWithBool);
        }
      })
      .catch(err => {
        console.error('Ошибка загрузки вопросов:', err);
        setQuestions([]);
      });
  }, [quizId]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          alert('Время вышло!');
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  if (questions.length === 0) return <p>Загрузка вопросов...</p>;

// Исправленная функция calculateResults в компоненте Quiz
const calculateResults = () => {
  let correctCount = 0;
  questions.forEach(q => {
    const selected = selectedAnswers[q.id];
    const correctAnswer = q.answers.find(a => a.is_correct);
    
    // Преобразуем оба значения к числу для сравнения
    if (Number(selected) === Number(correctAnswer?.id)) {
      correctCount++;
    }
  });
  return {
    correct: correctCount,
    incorrect: questions.length - correctCount,
    total: questions.length,
  };
};

  if (isFinished) {
    const results = calculateResults();

    return (
      <div>
        <h2>Тест завершён!</h2>
        <p>Спасибо за прохождение.</p>
        <p>Результаты:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>Правильных ответов:</strong> {results.correct}</li>
          <li><strong>Неправильных ответов:</strong> {results.incorrect}</li>
          <li><strong>Всего вопросов:</strong> {results.total}</li>
        </ul>

        <h3>Подробности:</h3>
        <ol>
          {questions.map(q => {
            const selectedId = selectedAnswers[q.id];
            const correctAnswer = q.answers.find(a => a.is_correct);
            const isCorrect = Number(selectedId) === Number(correctAnswer?.id);

            return (
              <li key={q.id} style={{ marginBottom: '1rem' }}>
                <p><strong>{q.question_text}</strong></p>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {q.answers.map(ans => {
                    const isSelected = Number(selectedId) === Number(ans.id);
                    const isRight = ans.is_correct;

                    let style = {};
                    if (isRight) {
                      style = { color: 'green', fontWeight: 'bold' };
                    }
                    if (isSelected && !isRight) {
                      style = { color: 'red', fontWeight: 'bold', textDecoration: 'line-through' };
                    }

                    return (
                      <li key={ans.id} style={style}>
                        {ans.answer_text} {isRight ? '✔️' : ''} {isSelected && !isRight ? '❌' : ''}
                      </li>
                    );
                  })}
                </ul>
                <p>
                  Ваш ответ: {isCorrect ? 'Правильный ✅' : 'Неправильный ❌'}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) return <p>Вопрос не найден</p>;

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: Number(answerId), // Явное преобразование к числу
    }));
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion.id]) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      clearInterval(timerRef.current);
      console.log('Отправляем ответы:', selectedAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div>Осталось времени: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
      <h3>Вопрос {currentIndex + 1} из {questions.length}</h3>
      <p>{currentQuestion.question_text}</p>
      <ul>
        {currentQuestion.answers.map(ans => (
          <li key={ans.id}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={selectedAnswers[currentQuestion.id] === ans.id}
                onChange={() => handleAnswerSelect(ans.id)}
              />
              {ans.answer_text}
            </label>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Предыдущий
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion.id]}
          style={{ marginLeft: '10px' }}
        >
          {currentIndex === questions.length - 1 ? 'Завершить тест' : 'Следующий вопрос'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
