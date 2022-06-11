const express = require('express');
const router = express.Router();
const { testProduct } = require('../controllers/product');

router.get('/testproduct', testProduct);

module.exports = router;