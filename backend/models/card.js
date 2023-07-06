const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },

  owner: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'user',
  },

  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
