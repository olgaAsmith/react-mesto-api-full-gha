class NotExist extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Указанной Вами страницы не существует';
  }
}

module.exports = NotExist;
