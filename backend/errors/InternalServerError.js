class InternalServerError extends Error {
  constructor() {
    super();
    this.statusCode = 500;
    this.message = 'Ошибка севрера';
  }
}

module.exports = InternalServerError;
