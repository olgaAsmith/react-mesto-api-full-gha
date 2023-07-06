require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const router = require('./routes/routes');
const { authorize } = require('./middlewares/auth');
const {
  createUser, login, logout,
} = require('./controllers/users');
const errorType = require('./middlewares/error');
const NotFound = require('./errors/NotFound');
const celebrate = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/signup', celebrate.userInfo, createUser);
app.post('/signin', celebrate.userInfo, login);
app.get('/logout', logout);
app.use(authorize);
app.use(router);
app.use('/*', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});
app.use(errorLogger);
app.use(errors()); // celebrate errors
app.use(errorType);
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Start...is 0kk....');
});
