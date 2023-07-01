const errorType = (error, req, res, next) => {
  if (!error.statusCode) {
    res.status(error.statusCode).send({
      message: 'Неизвестная ошибка',
    });
  }
  res.status(error.statusCode).send({
    message: error.message,
  });
  next();
};

module.exports = errorType;
