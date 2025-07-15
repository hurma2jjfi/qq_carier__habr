const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // проверка JWT

// Получить профиль текущего пользователя
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
