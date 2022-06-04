const User = require('../models/user');
const cookieToken = require('../utils/cookieToken');
const cloudinary = require('cloudinary');

exports.createUser = async(req, res) => {
    try {
        let fileUpload;
    
        if (req.files){
            let file = req.files.photo

            fileUpload = await cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: "users",
                width: 150,
                crop: "scale"
            })
        }

        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            throw new Error('Name, email and password are required');
        }

        // create a new user
        const user = await User.create({ 
            name, email, password, 
            photo: {id: fileUpload.public_id, secure_url: fileUpload.secure_url}
        })

        cookieToken(user, res);

    } catch (err) {
        res.status(400).send({error: err.message});
    }
    
}

exports.login = async(req, res) => {
    try {
        // Get a email and password from the req body
        const { email, password } = req.body;
        
        // Check if the Email and Password is available on req body
        if(!email || !password){
            throw new Error('Email or Password is required');
        }

        // find the user by email
        const user = await User.findOne({email}).select('+password');

        if(!user){
            throw new Error('Unable to find your account Please try again with valid credentials or signup');
        }

        const is_correct = await user.comparePassword(password);

        // Check the Password is correct or not
        if(!is_correct){
            throw new Error('Email or Password is incorrect');
        }

        cookieToken(user, res);

    } catch (err) {
        res.status(400).send({error: err.message});
    }
    
}

exports.logout = async(req, res) => {
    try {
        // cookie options
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }

        res.cookie('token', null, options);

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (err) {
        res.status(400).send({error: err.message});
    }
    
}