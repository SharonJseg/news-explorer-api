const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;
const { DEV_KEY, statusCodeList, errorText } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const register = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(statusCodeList.created).send({
        email: user.email,
        name: user.name,
        id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        throw new ConflictError(errorText.signup);
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError(errorText.signup);
      }
      next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY,
        { expiresIn: '7d' }
      );
      res.status(statusCodeList.ok).send({ token });
    })
    .catch(next);
};

module.exports = {
  register,
  login,
};
