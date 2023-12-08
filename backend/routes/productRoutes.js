const productController = require('../controllers/productController')
const {isAuthenticatedUser,authorizedRole} = require('../middleware/auth')
const express = require('express')

const router = express.Router()

router.route('/products').get(productController.getAllProducts)

router.route('/product/new').post(isAuthenticatedUser,authorizedRole("admin"),productController.createProduct)

router.route('/product/:id')
.put(isAuthenticatedUser,productController.updateProduct)
.delete(isAuthenticatedUser,productController.deleteProduct)
.get(productController.getProductDetails)

router.route('/products/r').get(productController.filterbyrating)

router.route('/review').put(isAuthenticatedUser,productController.createProductReview)

router.route('/reviews')
    .get(productController.getProductReview)
    .delete(isAuthenticatedUser,productController.deleteProductReview)

module.exports = router