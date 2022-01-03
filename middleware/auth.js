const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;
const { DEV_KEY, errorText } = require('../utils/constants');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(errorText.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY
    );
  } catch (err) {
    throw new AuthError(errorText.unauthorized);
  }

  req.user = payload;
  next();
};
