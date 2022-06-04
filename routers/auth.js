const express = require('express');
const router = express.Router();

// IMPORTS FROM AUTH CONTROLLERS
const { 
    createUser, 
    login,
    logout,
    forgotPassword,
    resetPassword
} = require('../controllers/auth');

router.post('/signup/', createUser);

router.post('/login/', login);

router.get('/logout', logout);

router.post('/forgotpassword', forgotPassword);

router.post('/password/reset/:token', resetPassword);

module.exports = router;