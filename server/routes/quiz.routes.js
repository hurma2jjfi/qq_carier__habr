const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

router.get('/:quizId/questions', quizController.getQuizQuestions);
router.post('/:quizId/submit', quizController.submitQuizAnswers);

module.exports = router;
