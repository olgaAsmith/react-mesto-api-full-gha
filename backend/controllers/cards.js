const Card = require('../models/card');
const ValidateError = require('../errors/ValidateError');
const IncorrectData = require('../errors/IncorrectData');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const newCard = { name, link, owner };
  Card.create(newCard)
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidateError('Введены некорректные данные'));
      } else {
        next(error);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFound('Данные не найдены'))
    .then((card) => {
      if (card.owner === req.user._id) {
        return card.deleteOne()
          .then(() => res.status(200).send({
            message: 'Карточка успешно удалена',
          }));
      }
      return next(new Forbidden('Нельзя удалить чужие данные'));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError('Введены некорректные данные'));
      } else if (error.message === 'Card not found' || error.message === 'Not Found') {
        next(new NotFound('Данные не найдены'));
      } else {
        next(error);
      }
    });
};

const getAllCards = (req, res, next) => {
  Card.find()
    .sort({ _id: -1 })
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((error) => {
      if (!req.cookie.token) {
        next(new IncorrectData('Доступно только для авторизованных пользователей'));
      } else {
        next(error);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFound('Данные не найдены'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError('Введены некорректные данные'));
      }
      next(error);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFound('Данные не найдены'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError('Введены некорректные данные'));
      }
      next(error);
    });
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
