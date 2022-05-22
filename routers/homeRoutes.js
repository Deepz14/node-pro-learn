const express = require('express');
const router = express.Router();

const { 
    getHomeData,
    dummyController 
} 
= require('../controllers/homeControllers');


router.get('/', getHomeData);

router.get('/dummy/', dummyController);


module.exports = router