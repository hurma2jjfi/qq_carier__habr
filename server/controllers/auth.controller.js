const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Регистрация
exports.registerUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Телефон и пароль обязательны' });
  }

  try {
    const [existingUser] = await db.query('SELECT id FROM users WHERE phone = ?', [phone]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Пользователь с таким телефоном уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (phone, password) VALUES (?, ?)', [phone, hashedPassword]);

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Логин
exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Телефон и пароль обязательны' });
  }

  try {
    const [users] = await db.query('SELECT id, password FROM users WHERE phone = ?', [phone]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Неверный телефон или пароль' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Неверный телефон или пароль' });
    }

    // Создаём JWT токен
    const token = jwt.sign({ userId: user.id, phone }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Успешный вход', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
