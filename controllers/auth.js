exports.createUser = (req, res, next) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400).send('Name, email, Password is required');
    }

    res.status(200).json({
        name,
        email,
        password,
        success: true,
        message: 'User created successfully'
    })
}

exports.getUser = (req, res) => {
    res.status(200).json({
        'name': 'deepz',
        'email': 'deepz@email.com'
    })
}