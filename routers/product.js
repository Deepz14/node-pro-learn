const express = require('express');
const router = express.Router();
const { verifyUser, customRoles} = require('../middlewares/userVerify');
const { 
    createProduct, 
    getAllProduct,
    getSingleProduct,
    adminGetAllProduct  
} = require('../controllers/product');

router.get('/getAllProduct', verifyUser, getAllProduct);
router.get('/:id', verifyUser, getSingleProduct);

// Admin routes
router.post('/admin/addProduct', verifyUser, customRoles('admin'), createProduct);
router.get('/admin/getAllProduct', verifyUser, customRoles('admin'), adminGetAllProduct);

module.exports = router;