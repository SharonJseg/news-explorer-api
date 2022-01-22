const router = require('express').Router();

const { register, login } = require('../controllers/authenticate');
const { validateRegister, validateLogin } = require('../middleware/validate');

router.post('/signup', validateRegister, register);
router.post('/signin', validateLogin, login);

module.exports = router;
