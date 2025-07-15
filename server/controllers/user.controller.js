const db = require('../config/db.config'); // ваш модуль для работы с БД

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const [rows] = await db.query('SELECT phone FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const user = rows[0];
    res.json({ phone: user.phone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
