const express = require('express');
const router = express.Router();
const {verifyUser, customRoles} = require('../middlewares/userVerify');

const { 
   getuser,
   changePassword,
   updateUser,
   adminGetAllUsers,
   adminGetUserbyId,
   adminUpdateUser,
   managerAllUsers
} = require('../controllers/user');

router.get('/userinfo', verifyUser, getuser);

router.post('/changepassword', verifyUser, changePassword);

router.post('/updateUser', verifyUser, updateUser);

// admin routes
router.get('/admin/allusers', verifyUser, customRoles('admin'), adminGetAllUsers);
router.get('/admin/user/:id', verifyUser, customRoles('admin'), adminGetUserbyId);
router.put('/admin/user/:id', verifyUser, customRoles('admin'), adminUpdateUser);

// manager routes
router.get('/manager/allusers', verifyUser, customRoles('manager'), managerAllUsers);

module.exports = router