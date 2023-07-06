const errorType = (error, req, res, next) => {
  if (error.statusCode === 500) {
    return res.status(error.statusCode).send({
      message: 'Ошибка сервера',
    });
  }
  res.status(error.statusCode).send({
    message: error.message,
  });
  return next();
};

module.exports = errorType;
