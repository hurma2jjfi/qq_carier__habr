const db = require('../config/db.config'); // ваш модуль подключения к БД

exports.getLanguages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name FROM languages ORDER BY name ASC');
    res.json({ success: true, languages: rows });
  } catch (error) {
    console.error('Ошибка при получении языков:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера при получении языков' });
  }
};
