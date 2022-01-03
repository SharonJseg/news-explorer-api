module.exports.DEV_KEY = 'my-secret-code';

module.exports.statusCodeList = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
};

module.exports.errorText = {
  notFound: 'Requested resource could not be found',
  unauthorized: 'Authorization required',
  serverError: 'The server is not responding',
  deleteArticle: 'You cannot delete this article',
  articleBadRequest: 'Data validation failed',
  articleNotFound: 'Article is not found',
  signup: 'Unable to create the user',
  signin: 'Incorrect email or password',
  usersBadRequest: 'The users were not found',
  userBadRequest: 'The user was not found',
};
