const express = require('express');
const router = express.Router();
const { verifyUser, customRoles } = require('../middlewares/userVerify');
const {
    createOrder
} = require('../controllers/order');


//userRoutes
router.post('/createOrder', verifyUser, createOrder);

//adminRoutes


module.exports = router;