// getHomeData controller
exports.getHomeData = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Request successfull'
    })
}

// dummy controller
exports.dummyController = (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Dummy controller successfully received'
    })
}