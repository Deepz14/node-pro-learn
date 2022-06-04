const cookieToken = async(user, res) => {
    // generate a jwt token
    const token = await user.getJwtToken()

    // cookie options
    const options = {
        expires: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    user.password = undefined;
    res.status(200).cookie('token', token, options).json({ success: true, token, user});
}

module.exports = cookieToken;