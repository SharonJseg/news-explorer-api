const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getArticles,
  addArticle,
  removeArticle,
} = require('../controllers/articles');
const { validateCreateArticle } = require('../middleware/validate');

router.get('/', auth, getArticles);
router.post('/', auth, validateCreateArticle, addArticle);
router.delete('/:articleId', auth, removeArticle);

module.exports = router;
