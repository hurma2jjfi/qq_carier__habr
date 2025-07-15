const express = require('express');
const router = express.Router();

const usersRouter = require('./user.routes');

router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.send('API работает');
});

module.exports = router;
