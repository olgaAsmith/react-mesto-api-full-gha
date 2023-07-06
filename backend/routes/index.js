const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { authorize } = require('../middlewares/auth');
const {
  createUser, login, logout,
} = require('../controllers/users');
const celebrate = require('../middlewares/celebrate');

router.post('/signup', celebrate.userInfo, createUser);
router.post('/signin', celebrate.userInfo, login);
router.get('/logout', logout);
router.use(authorize);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
