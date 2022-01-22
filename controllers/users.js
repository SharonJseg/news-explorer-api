const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { statusCodeList, errorText } = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError(errorText.usersBadRequest))
    .then((users) => res.status(statusCodeList.ok).send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorText.userBadRequest);
      }
      res.status(statusCodeList.ok).send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
};
