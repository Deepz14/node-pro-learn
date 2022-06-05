const express = require('express');
const router = express.Router();
const {verifyUser} = require('../middlewares/userVerify');

const { 
   getuser,
   changePassword,
   updateUser
} = require('../controllers/user');

router.get('/userinfo', verifyUser, getuser);

router.post('/changepassword', verifyUser, changePassword);

router.post('/updateUser', verifyUser, updateUser);

module.exports = router