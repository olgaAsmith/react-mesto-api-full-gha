const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidateError = require('../errors/ValidateError');
const InternalServerError = require('../errors/InternalServerError');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashed) => {
      User.create({ ...req.body, password: hashed })
        .then((user) => res.status(201).send(
          {
            // eslint-disable-next-line max-len
            name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
          },
        ))
        .catch((error) => {
          if (error.message.includes('validation failed')) {
            next(new ValidateError());
          } else if (error.code === 11000) {
            next(new Conflict());
          } else {
            next(new InternalServerError());
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret',
      );
      res.cookie('token', token, {
        maxAge: 604800000,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(() => {
      next(new InternalServerError());
    });
};

const getUser = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      next(new InternalServerError());
    });
};

const getUserByID = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new Error('User not found'))
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError());
      } else if (error.message === 'User not found') {
        next(new NotFound());
      } else {
        next(new InternalServerError());
      }
    });
};

const updateUserinfo = (req, res, next) => {
  const { name, about } = req.body;
  const info = { name, about };
  User.findByIdAndUpdate(req.user._id, info, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ user }))
    .catch((error) => {
      if (error.message.includes('validation failed')) {
        next(new ValidateError());
      } else if (error.message === 'User not found') {
        next(new NotFound());
      } else {
        next(new InternalServerError());
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const newAvatar = { avatar };
  User.findByIdAndUpdate(req.user._id, newAvatar, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ user }))
    .catch((error) => {
      if (error.message.includes('validation failed')) {
        next(new ValidateError());
      } else if (error.message === 'User not found') {
        next(new NotFound());
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports = {
  getUser, createUser, getUserByID, updateUserinfo, updateUserAvatar, login, getUserMe,
};
