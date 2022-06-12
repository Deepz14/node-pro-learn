const Product = require('../models/product');
const cloudinary = require('cloudinary');
const WhereClause = require('../utils/whereClause');

exports.createProduct = async(req, res) => {
    try {
        
        let productImg = [];
        
        // check if the photos is exist
        if(!req.files){
            throw new Error('Please provide a Product Photos');
        }

        // Image Upload to cloudinary
        for (let index = 0; index < req.files.photos.length; index++) {
            let file = req.files.photos[index];

            let fileUpload = await cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: "products",
            });
            
            productImg.push({
                id: fileUpload.public_id, 
                secure_url: fileUpload.secure_url
            });
        }
        req.body.photos = productImg;
        req.body.user = req.user._id;
        
        const product = await Product.create(req.body);

        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        if (req.body.photos.length > 0){
            for (let index = 0; index < req.body.photos.length; index++) {
                await cloudinary.v2.uploader.destroy(req.body.photos[index].id);
            }
        }
        res.status(400).send({error: err.message});
    }
}

exports.getAllProduct = async(req, res) => {
    try {
        
        const resultPerPage = 6;
        const totalCountProduct = await Product.countDocuments();

        let productObj = new WhereClause(Product.find(), req.query).search().filter();

        let products = await productObj.base;
        const filteredProducts = products.length;

        productObj.pager(resultPerPage);
        products = await productObj.base.clone();

        res.status(200).json({
            success: true,
            products,
            totalCountProduct,
            filteredProducts
        })

    } catch (err) {
        res.status(400).send({error: err.message});    
    }
}

exports.getSingleProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new Error('Product not Found');
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        res.status(400).send({error: err.message});  
    }
}

exports.adminGetAllProduct = async(req, res) => {
    try {
        
        const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        res.status(400).send({error: err.message});  
    }
}

exports.adminUpdateProduct = async(req, res) => {
    try {
        
        let product = await Product.findById(req.params.id);

        if (!product) {
            throw new Error('Product not Found');
        }

        let productImg = [];
        
        // check if the photos is exist
        if(req.files){
            // remove or destroy the product image if exist
            if (product.photos.length > 0){
                for (let index = 0; index < product.photos.length; index++) {
                    await cloudinary.v2.uploader.destroy(product.photos[index].id);
                }
            }

            // Image Upload to cloudinary
            for (let index = 0; index < req.files.photos.length; index++) {
                let file = req.files.photos[index];

                let fileUpload = await cloudinary.v2.uploader.upload(file.tempFilePath, {
                    folder: "products",
                });
                
                productImg.push({
                    id: fileUpload.public_id, 
                    secure_url: fileUpload.secure_url
                });
            }
            
        }

        
        req.body.photos = productImg;
        req.body.user = req.user._id;

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.adminDeleteProduct = async(req, res) => {
    try {
        
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new Error('Product not Found');
        }

        // remove or destroy the product image if exist
        if (product.photos.length > 0){
            for (let index = 0; index < product.photos.length; index++) {
                await cloudinary.v2.uploader.destroy(product.photos[index].id);
            }
        }

        // remove product
        await product.remove();

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}