const User = require('../models/user');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

exports.verifyUser = async(req, res, next) => {

    // Get the token from the req object
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

    if(!token){
        return next(res.status(401).send({error: 'Login first to access this page'}));
    }

    // verifying the token and get the payload(id) that is send during jwt creation
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decoded){
        return next(res.status(401).send({error: 'Invalid token User not identified'}));
    }
    
    req.user = await User.findById(decoded.id);;

    next();
}

exports.customRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(res.status(403).send({error: 'You are allowed for this resource'}));
        }
        next();
    }
}