const express = require('express');
const router = express.Router();
const { verifyUser, customRoles} = require('../middlewares/userVerify');
const { 
    createProduct, 
    getAllProduct,
    getSingleProduct,
    adminGetAllProduct,
    adminUpdateProduct,
    adminDeleteProduct  
} = require('../controllers/product');

router.get('/getAllProduct', verifyUser, getAllProduct);
router.get('/:id', verifyUser, getSingleProduct);

// Admin routes
router.post('/admin/addProduct', verifyUser, customRoles('admin'), createProduct);
router.get('/admin/getAllProduct', verifyUser, customRoles('admin'), adminGetAllProduct);
router.put('/admin/updateProduct/:id', verifyUser, customRoles('admin'), adminUpdateProduct);
router.delete('/admin/deleteProduct/:id', verifyUser, customRoles('admin'), adminDeleteProduct);

module.exports = router;