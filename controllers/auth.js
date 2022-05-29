const User = require('../models/user');
const cookieToken = require('../utils/cookieToken');
const cloudinary = require('cloudinary');

exports.createUser = async(req, res) => {
    try {
        let fileUpload;

        if (req.files){
            let file = req.files.photo
            fileUpload = await cloudinary.v2.uploader.upload(file, {
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
            name, email,password, 
            photo: {id: fileUpload.public_id, secure_url: fileUpload.secure_url}
        })

        cookieToken(user, res);

    } catch (err) {
        res.status(400).send({error: err.message});
    }
    
}

exports.getUser = (req, res) => {
    res.status(200).json({
        'name': 'deepz',
        'email': 'deepz@email.com'
    })
}