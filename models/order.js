const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'Please provide a address']
        },
        phoneNumber: {
            type: Number,
            required: [true, 'Please provide a phone number']
        },
        pincode: {
            type: Number,
            required: [true, 'Please provide a pincode']
        },
        state: {
            type: String,
            required: [true, 'Please provide a state']
        },
        city: {
            type: String,
            required: [true, 'Please provide a city']
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    paymentInfo: {
        id: {
            type: String
        }
    },
    taxAmount: {
        type: Number
    },
    shippingAmount: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    orderStatus: {
        type: String,
        default: 'processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Order', orderSchema);