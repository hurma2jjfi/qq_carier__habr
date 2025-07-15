const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Нет токена авторизации' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Нет токена авторизации' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // предполагается, что в токене есть userId
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};
