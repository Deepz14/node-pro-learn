const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


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
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Encrypt password before save
userSchema.pre("save", async function(next) {
    // Only run this function if password was modified (not on other update functions)
    if(!this.isModified('password')) return next();

    // Hash password with strength of 10
    this.password = await bcrypt.hash(this.password, 10);
})

// compare Password from the request body
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(this.password, password);
}

// create and return JWT token
userSchema.methods.getJwtToken = async() => {
    return await jwt.sign({id: this._id}, 
        process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRY    
    });
}


// generate a forgotPasswordToken - (string)
userSchema.methods.getForgotPasswordToken = function(){
    // generate a long and random string
    const forgotPassword = crypto.randomBytes(20).toString('hex');

    // getting a Hash - backend
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotPassword).digest('hex');

    // time of token
    this.forgotPasswordExpiry = Date.now() + 5 * 60 * 1000;

    return forgotPassword;
}


module.exports = mongoose.model('User', userSchema);