const jwt = require('jsonwebtoken');
const IncorrectData = require('../errors/IncorrectData');

const { NODE_ENV, JWT_SECRET } = process.env;

const authorize = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.includes('Bearer')) {
    return next(new IncorrectData('Пройдите авторизацию'));
  }
  const tokenClear = token.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(tokenClear, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (error) {
    next(new IncorrectData('Неверный логин или пароль'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  authorize,
};
