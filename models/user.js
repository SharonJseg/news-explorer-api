const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const AuthError = require('../errors/AuthError');
const { errorText } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'This email is not valid',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(errorText.signin);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthError(errorText.signin);
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
