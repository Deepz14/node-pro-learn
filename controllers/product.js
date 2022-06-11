
exports.testProduct = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Product tested successfully!'
        })
        
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}