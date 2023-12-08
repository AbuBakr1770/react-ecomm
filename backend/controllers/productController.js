const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const error = require('../middleware/error');
const APIFeatures = require('../utils/apiFeatures');


// filter by rating

exports.filterbyrating = catchAsyncError(async (req,res,nexy) =>{

    const {rating} = req.query

    let products = await productModel.find({rating})

    res.status(200).json({
        products,
        message:"products by rating"
    })
})

// get all products
exports.getAllProducts = catchAsyncError(async (req, res,next) => {
    // return next(new ErrorHandler('this is temp error test',404))
    let resultPerPage = 20

    let numberOfProducts =  await  productModel.find()
     numberOfProducts =  numberOfProducts.length

    const apifeature = new APIFeatures(productModel, req.query).search().filter().pagination(resultPerPage)

    const products = await apifeature.query;
    res.status(200).json({
        numberOfProducts,
        numberOfFetchedProducts: products.length,
        message: 'Fetched all products successfully!!',
        products,
        resultPerPage
    });
});

// create product admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await productModel.create(req.body);

    res.status(201).json({
        message: 'Created a new product successfully',
        product,
    });
});

// update product admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        message: 'Updated product successfully',
        success: true,
        product,
    });
});

// get product details or get one product by id
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// delete product admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: 'Deleted product successfully',
        success: true,
        product,
    });
});


// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await productModel.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    product.noOfReviews = product.reviews.length

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });
});


// get all Reviews of a product
exports.getProductReview = catchAsyncError(async (req, res, next) => {
    const productId = req.query.productId

    const product = await productModel.findById(productId)
    if (!product) {
        return next(new ErrorHandler('product not found'), 404)
    }
    const reviews = product.reviews

    res.status(200).json({
        success: true,
        "No of reviews": reviews.length,
        reviews,
        "Product Name": product.name,
        "ProductId": product._id
    })
});

// get all Reviews of a product
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {

    const productId = await req.query.productId
    const id = await req.query.id

    let product = await productModel.findById(productId)

    if (!product) {
        return next(new ErrorHandler('product not found'), 404)
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== id.toString())

    console.log(reviews)
    // const reviews = await product.reviews.findByIdAndDelete(id)


    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;
    const noOfReviews = reviews.length

    await productModel.findByIdAndUpdate(productId, {
        reviews,
        ratings,
        noOfReviews
    }, {new: true, runValidators: true})

    res.status(200).json({
        success: true,
        message:"Review deleted successfully",
        "No of reviews": reviews.length,
        reviews,
        "Product Name": product.name,
        "ProductId": product._id
    })

});




