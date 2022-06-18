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

        let order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            stock,
            taxAmount,
            shippingAmount,
            totalAmount,
            user: req.user._id
        });


        res.status(200).json({
            success: true,
            order
        });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.getOneOrder = async(req, res) => {
    try {
        
        let order = await Order.findById(req.params.id).populate("user", "name email");

        if(!order){
            throw new Error('Order not found');
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.getAllOrders = async(req, res) => {
    try {

        let orders = await Order.find({user: req.user._id}).populate("user", "name email");
    
        res.status(200).json({
            success: true,
            orders
        });
        
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}