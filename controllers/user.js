const User = require('../models/user');
const cookieToken = require('../utils/cookieToken');
const cloudinary = require('cloudinary');

exports.getuser = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.changePassword = async(req, res) => {
    try {
        // Get the old and new password
        const { oldPassword, newPassword } = req.body;

        // Get the user from the DB
        const user = await User.findById(req.user._id).select('+password');;
       
        // validating the old password
        const is_correct_password = await user.comparePassword(oldPassword);
       
        if(!is_correct_password){
            throw new Error('Please provide a valid password');
        }

        user.password = newPassword;

        await user.save();

        cookieToken(user, res);
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.updateUser = async(req, res) => {
    try {
        const { name, email} = req.body;

        let updatePayload = {
            name,
            email
        };

        // photo updation
        if(req.files){
            // Remove the Image from the cloudinary
            await cloudinary.v2.uploader.destroy(req.user.photo.id);

            // Upload new Image to the cloudinary
            const fileUpload = await cloudinary.v2.uploader.upload(req.files.photo.tempFilePath,{
                folder: "users",
                width: 150,
                crop: "scale"
            });

            updatePayload.photo = {
                id: fileUpload.public_id, 
                secure_url: fileUpload.secure_url
            }
        }

        const user = await User.findByIdAndUpdate(req.user._id, updatePayload, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            user: user
        })

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.adminGetAllUsers = async(req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        });

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.managerAllUsers = async(req, res) => {
    try {
        const users = await User.find({role: 'user'});

        res.status(200).json({
            success: true,
            users
        });

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}