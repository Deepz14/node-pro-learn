const express = require('express');
const router = express.Router();

// IMPORTS FROM AUTH CONTROLLERS
const { 
    createUser, 
    login,
    logout
} = require('../controllers/auth');

router.post('/signup/', createUser);

router.post('/login/', login);

router.get('/logout', logout);

module.exports = router;