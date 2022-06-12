const express = require('express');
const router = express.Router();
const { verifyUser, customRoles} = require('../middlewares/userVerify');
const { createProduct, getAllProduct  } = require('../controllers/product');

router.get('/getAllProduct', verifyUser, getAllProduct);

// Admin routes
router.post('/admin/addProduct', verifyUser, customRoles('admin'), createProduct);

module.exports = router;