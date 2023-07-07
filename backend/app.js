require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const router = require('./routes');
const errorType = require('./middlewares/error');
const NotFound = require('./errors/NotFound');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use('/*', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});
app.use(errorLogger);
app.use(errors()); // celebrate errors
app.use(errorType);
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Start...is 0k1');
});
