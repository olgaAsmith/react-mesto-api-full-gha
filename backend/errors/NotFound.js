class NotFound extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Таких данных не существуют';
  }
}

module.exports = NotFound;
