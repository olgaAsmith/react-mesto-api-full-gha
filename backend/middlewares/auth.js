const jwt = require('jsonwebtoken');
const IncorrectData = require('../errors/IncorrectData');

const authorize = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new IncorrectData('Неверный логин или пароль');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (error) {
    next(new IncorrectData('Неверный логин или пароль'));
  }
  req.user = payload;
  next();
};

module.exports = {
  authorize,
};
