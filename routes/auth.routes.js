const express = require('express');

//Specialisé dans les route auth
const router = express.Router();

const authController = require('../controllers/auth.controller');

const validateRegister = require('../middlewares/validateRegister');

const authLimiter = require('../middlewares/authRateLimiter')

router.post('/register',validateRegister, authController.register);

router.post('/login',authLimiter ,authController.login);

module.exports = router;
