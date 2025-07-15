const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes'); // <-- импортируйте здесь
const languageRoutes = require('./routes/language.routes');
const quizRoutes = require('./routes/quiz.routes');




app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/user', userRoutes); // <-- используйте импортированный роут
app.use('/api/languages', languageRoutes);
app.use('/api/quizzes', quizRoutes);


// Обработка ошибок 404
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
