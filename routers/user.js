const express = require('express');
const router = express.Router();
const {verifyUser, customRoles} = require('../middlewares/userVerify');

const { 
   getuser,
   changePassword,
   updateUser,
   adminGetAllUsers,
   managerAllUsers
} = require('../controllers/user');

router.get('/userinfo', verifyUser, getuser);

router.post('/changepassword', verifyUser, changePassword);

router.post('/updateUser', verifyUser, updateUser);

// admin routes
router.get('/admin/allusers', verifyUser, customRoles('admin'), adminGetAllUsers);

// manager routes
router.get('/manager/allusers', verifyUser, customRoles('manager'), managerAllUsers);

module.exports = router