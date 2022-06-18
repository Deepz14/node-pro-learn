const Order = require('../models/order');
const Product = require('../models/product');


exports.createOrder = async(req, res) => {
    try {
        
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

