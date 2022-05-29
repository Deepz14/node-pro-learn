const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [100, "Name should be under 100 characters"],
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        validate: [validator.default.isEmail, "Please enter a valid Email"],
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password should be minimum 6 characters"],
        required: [true, "Password is required"],
        select: false
    },
    role: {
        type: String,
        default: "user"
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }

    },
    forgotPasswordToken: String,
    resetExpiryToken: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);