const express = require('express');
const router = express.Router();
const { verifyUser, customRoles } = require('../middlewares/userVerify');
const {
    createOrder,
    getOneOrder,
    getAllOrders,
    adminGetAllOrders
} = require('../controllers/order');


//userRoutes
router.post('/createOrder', verifyUser, createOrder);
router.get('/getOrders', verifyUser, getAllOrders);
router.get('/:id', verifyUser, getOneOrder);


//adminRoutes
router.get('/admin/getAllOrders', verifyUser, customRoles('admin'), adminGetAllOrders);


module.exports = router;