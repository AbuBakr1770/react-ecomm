const express = require('express')
const {isAuthenticatedUser, authorizedRole} = require('../middleware/auth')
const orderController = require('../controllers/orderController')

const Router = express.Router()

Router.route('/order/new').post(isAuthenticatedUser, orderController.newOrder)


Router.route('/order/getAll').get(isAuthenticatedUser, orderController.getMyOrders)

Router.route('/order/:id').get(isAuthenticatedUser, orderController.getSingleOrder)

Router.route('/order').get(isAuthenticatedUser, authorizedRole('admin')
    , orderController.getSingleOrder)

Router.route('/admin/order')
     .get(
    isAuthenticatedUser,
    authorizedRole('admin'),
    orderController.getAllOrders
)

Router.route('/admin/order/:id')
    .put(
        isAuthenticatedUser,
        authorizedRole('admin'),
        orderController.updateOrderStatus
    ).delete(
    isAuthenticatedUser,
    authorizedRole('admin'),
    orderController.deleteOrder
)


module.exports = Router
