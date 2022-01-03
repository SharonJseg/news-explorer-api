const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getArticles,
  addArticle,
  removeArticle,
} = require('../controllers/articles');
const {
  validateCreateArticle,
  validateArticleId,
} = require('../middleware/validate');

router.get('/', auth, getArticles);
router.post('/', auth, validateCreateArticle, addArticle);
router.delete('/:articleId', auth, validateArticleId, removeArticle);

module.exports = router;
