const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const { authorize } = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');
const errorType = require('./middlewares/error');
const NotExist = require('./errors/NotExist');
const celebrate = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', celebrate.userInfo, createUser);
app.post('/signin', celebrate.userInfo, login);

app.use(authorize);
app.use(cors);

app.use(router);

app.use('/*', (req, res, next) => {
  next(new NotExist());
});

app.use(errorLogger);

app.use(errors()); // celebrate errors
app.use(errorType);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Start...is 0k');
});
