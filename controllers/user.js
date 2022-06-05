const User = require('../models/user');

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