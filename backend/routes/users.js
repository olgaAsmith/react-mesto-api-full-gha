const router = require('express').Router();
const {
  getUser, getUserByID, updateUserinfo, updateUserAvatar, getUserMe,
} = require('../controllers/users');
const celebrate = require('../middlewares/celebrate');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:id', celebrate.userID, getUserByID);
router.patch('/me', celebrate.userUpdateInfo, updateUserinfo);
router.patch('/me/avatar', celebrate.userUpdateAvatar, updateUserAvatar);

module.exports = router;
