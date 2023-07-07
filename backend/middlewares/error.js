const errorType = (error, req, res, next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).send({
      message: error.message,
    });
  }
  res.status(500).send({
    message: 'Ошибка сервера',
  });
  return next();
};

module.exports = errorType;
