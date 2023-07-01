class Conflict extends Error {
  constructor() {
    super();
    this.statusCode = 409;
    this.message = 'Пользователь с такими данными уже существует';
  }
}

module.exports = Conflict;
