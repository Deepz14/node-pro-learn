const express = require('express');
const router = express.Router();

// IMPORTS FROM AUTH CONTROLLERS
const { createUser, getUser } = require('../controllers/auth');

router.get('/user/', getUser);

router.post('/signup/', createUser);


module.exports = router;