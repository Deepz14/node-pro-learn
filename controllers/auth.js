const User = require('../models/user');
const cookieToken = require('../utils/cookieToken');

exports.createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            throw new Error('Name, email and password are required');
        }

        // create a new user
        const user = await User.create({name,email,password})

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