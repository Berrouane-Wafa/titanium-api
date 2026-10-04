const express = require('express');

//Specialisé dans les route auth
const router = express.Router();

const authController = require('../controllers/auth.controller');

const validateRegister = require('../middlewares/validateRegister');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register',validateRegister, authController.register);

router.post('/login', authController.login);

router.get("/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        user: req.user
    });
});

module.exports = router;
