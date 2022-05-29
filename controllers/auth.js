const User = require('../models/user');

exports.createUser = async(req, res) => {
    try {
     const {name, email, password} = req.body;

    if (!name || !email || !password) {
        throw new Error('Name, email, password is required');
    }

    res.status(200).json({
        name,
        email,
        password,
        success: true,
        message: 'User created successfully'
    })
        
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