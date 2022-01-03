const Article = require('../models/article');
const { statusCodeList, errorText } = require('../utils/constants');

const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForBiddenError = require('../errors/ForbiddenError');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.status(statusCodeList.ok).send(articles))
    .catch(() => {
      throw new ServerError(errorText.serverError);
    })
    .catch(next);
};

const addArticle = (req, res, next) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => {
      res.status(statusCodeList.ok).send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(errorText.articleBadRequest);
      }
    })
    .catch(next);
};

const removeArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(errorText.articleNotFound);
      }
      if (article.owner.toString() === req.user._id.toString()) {
        Article.deleteOne(article).then((deletedArticle) => {
          res.status(statusCodeList.ok).send(deletedArticle);
        });
      } else {
        throw new ForBiddenError(errorText.deleteArticle);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  addArticle,
  removeArticle,
};
