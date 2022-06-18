const Order = require('../models/order');
const Product = require('../models/product');


exports.createOrder = async(req, res) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            stock,
            taxAmount,
            shippingAmount,
            totalAmount
        } = req.body;
        
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

