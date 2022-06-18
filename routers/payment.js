const express = require('express');
const router = express.Router();
const { verifyUser} = require('../middlewares/userVerify');
const {
    sendStripeKey,
    sendRazorPayKey,
    stripePayment,
    razorPayment
} = require('../controllers/payment');

router.get('/getStripeKey', verifyUser, sendStripeKey);
router.get('/getRazorPayKey', verifyUser, sendRazorPayKey);
router.post('/stripePayment', verifyUser, stripePayment);
router.post('/razorPayment', verifyUser, razorPayment);



module.exports = router;