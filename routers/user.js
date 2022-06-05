const express = require('express');
const router = express.Router();
const {verifyUser, customRoles} = require('../middlewares/userVerify');

const { 
   getuser,
   changePassword,
   updateUser,
   adminGetAllUsers
} = require('../controllers/user');

router.get('/userinfo', verifyUser, getuser);

router.post('/changepassword', verifyUser, changePassword);

router.post('/updateUser', verifyUser, updateUser);

router.get('/admin/allusers', verifyUser, customRoles('admin'), adminGetAllUsers);

module.exports = router