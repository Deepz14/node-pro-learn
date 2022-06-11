const express = require('express');
const router = express.Router();
const { verifyUser, customRoles} = require('../middlewares/userVerify');
const { createProduct  } = require('../controllers/product');

// Admin routes
router.post('/admin/addProduct', verifyUser, customRoles('admin'), createProduct);

module.exports = router;