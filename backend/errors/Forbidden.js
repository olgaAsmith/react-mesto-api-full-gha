class Forbidden extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = 'Нельзя удалить чужие данные';
  }
}

module.exports = Forbidden;
