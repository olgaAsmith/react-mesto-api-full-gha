require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/routes');
const { authorize } = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');
const errorType = require('./middlewares/error');
const NotExist = require('./errors/NotExist');
const celebrate = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors({
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate.userInfo, createUser);
app.post('/signin', celebrate.userInfo, login);
app.use(authorize);
app.use(router);
app.use('/*', (req, res, next) => {
  next(new NotExist());
});
app.use(errorLogger);
app.use(errors()); // celebrate errors
app.use(errorType);
app.listen(3000, () => {
  console.log('Start...is 0k');
});
