const { isCelebrateError } = require('celebrate');

const { statusCodeList, errorText } = require('../utils/constants');

const errorController = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res
      .status(statusCodeList.badRequest)
      .send({ message: [...err.details.entries()][0][1].message });
  } else {
    const { statusCode = statusCodeList.ok, message } = err;

    res.status(statusCode).send({
      message:
        statusCode === statusCodeList.serverError
          ? errorText.serverError
          : message,
    });
  }
};

module.exports = {
  errorController,
};
