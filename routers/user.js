const express = require('express');
const router = express.Router();
const {verifyUser} = require('../middlewares/userVerify');

const { 
   getuser
} = require('../controllers/user');

router.get('/userinfo', verifyUser, getuser);

module.exports = router