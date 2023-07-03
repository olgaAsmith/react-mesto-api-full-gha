const Card = require('../models/card');
const ValidateError = require('../errors/ValidateError');
const InternalServerError = require('../errors/InternalServerError');
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
      if (error.message.includes('validation failed')) {
        next(new ValidateError());
      } else {
        next(new InternalServerError());
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new Error('Card not found'))
    .then((card) => {
      if (card.owner.includes(req.user._id)) {
        card.deleteOne()
          .then(() => res.status(200).send({
            message: 'Карточка успешно удалена',
          }));
      } else {
        next(new Forbidden());
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError());
      } else if (error.message === 'Card not found' || error.message === 'Not Found') {
        next(new NotFound());
      } else {
        next(new InternalServerError());
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
      if (error.message.includes('validation failed')) {
        next(new IncorrectData('Доступно только для авторизованных пользователей'));
      } else {
        next(new InternalServerError());
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Card not found'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError());
      } else if (error.message === 'Card not found' || error.message === 'Not Found') {
        next(new NotFound());
      } else {
        next(new InternalServerError());
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Card not found'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError());
      } else if (error.message === 'Not found' || error.message === 'Card not found') {
        next(new NotFound());
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
