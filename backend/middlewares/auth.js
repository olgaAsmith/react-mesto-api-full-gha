const jwt = require('jsonwebtoken');
const IncorrectData = require('../errors/IncorrectData');

const { NODE_ENV, JWT_SECRET } = process.env;

const authorize = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new IncorrectData('Доступно только для авторизованных пользователей'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (error) {
    return next(new IncorrectData('Неверный логин или пароль'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  authorize,
};
