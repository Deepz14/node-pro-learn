const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [100, 'Product name should be under 100 characters'],
        trim: true,
        required: [true, 'Please provide a name for the product']
    },
    price: {
        type: Number,
        maxlength: [6, 'Price should be maximum of 6 digits'],
        required: [true, 'Please provide a price for the product']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the product']
    },
    photos: [
        {
            id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select a category from short-sleeve, long-sleeve, sweatshirt, hoodie'],
        enum: {
            values: ['shortsleeve', 'longsleeve', 'sweatshirt', 'hoodie'],
            message: 'Please a select a valid category'
        }
    },
    brand: {
        type: String,
        required: [true, 'Please provide a brand name']
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    totalReviews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);


