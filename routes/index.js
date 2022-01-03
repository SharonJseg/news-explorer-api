const router = require('express').Router();

const auth = require('./authenticate');
const users = require('./users');
const articles = require('./articles');

router.use('/', auth);
router.use('/users', users);
router.use('/articles', articles);

module.exports = router;
