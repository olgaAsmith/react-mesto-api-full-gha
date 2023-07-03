const allowedCors = [
  'https://mesto-solarsystem.nomoreparties.sbs',
  'http://mesto-solarsystem.nomoreparties.sbs',
  'https://api.mesto-solarsystem.nomoreparties.sbs',
  'http://api.mesto-solarsystem.nomoreparties.sbs',
  'http://localhost:3000',
  'https://localhost:3000',

];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = cors;
