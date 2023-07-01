class ValidateError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Введены некорректные данные';
  }
}

module.exports = ValidateError;
