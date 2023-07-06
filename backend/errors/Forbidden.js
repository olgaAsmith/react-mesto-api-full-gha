class Forbidden extends Error {
  constructor(message) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

module.exports = Forbidden;
