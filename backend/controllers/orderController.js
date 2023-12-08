const orderModel = require('../models/orderModel')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const productModel = require('../models/productModel')

// create a new order
exports.newOrder = catchAsyncError(async (req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

  const order =  await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user:req.user._id,
        paidAt:Date.now()
    })

    res.status(200).json({
        success:true,
        message:"created a new order!",
        order
    })
})


// update an order
exports.updateOrder = catchAsyncError(async (req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

    const order =  await orderModel.findByIdAndUpdate(req.params.id,{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user:req.user._id,
        paidAt:Date.now()
    })

    res.status(200).json({
        success:true,
        message:"updated order!",
        order
    })
})


// get single order
exports.getSingleOrder = catchAsyncError(async (req,res,next)=>{

    console.log('hello')

    // populate is not working as expects

    // const order = await orderModel.findById(req.params.id).populate('User','name email')
    // return next(new ErrorHandler('do not get the order',404))

    const order = await orderModel.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('order not found',404))
    }

    res.status(200).json({
        success:true,
        message:"order exists",
        order
    })

})



// get logged-in user orders
exports.getMyOrders = catchAsyncError(async (req,res,next)=>{

     let userId = req.user.id

    const orders = await orderModel.find({user:userId})


    res.status(200).json({
        success:true,
        message:"order exists",
        orders
    })

})

// get All orders
exports.getAllOrders = catchAsyncError(async (req,res,next)=>{

    let totalmount = 0

    const orders = await orderModel.find()

    // orders.forEach((order) => { totalmount += order.paymentInfo.totalprice})

    res.status(200).json({
        success:true,
        "number of orders":orders.length,
        totalmount,
        orders
    })

})


// update order status orders
exports.updateOrderStatus = catchAsyncError(async (req,res,next)=>{

      const order = await orderModel.findById(req.params.id)

    if(order.orderStatus === 'delivered'){
        return next(new ErrorHandler('This order has been delivered',404))
    }

    if(req.body.orderStatus === 'delivered'){
        order.deliveredAt = Date.now()
        order.orderItems.forEach(async (item) => {
            await updateStock(item.product, item.quantity)
        })
    }

    order.orderStatus = req.body.orderStatus

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        message:"Updated order status successfully",
        order

    })

})


// delete order
exports.deleteOrder = catchAsyncError(async (req,res,next)=>{

    const order = await orderModel.find(req.params.id)

    if(!order){
        return next(new ErrorHandler('This order does not exist',404))
    }

      await order.remove()

    res.status(200).json({
        success:true,
        message:"Deleted order successfully",

    })

})



// helper function to update stock info
async function updateStock (id,quantity){

    const product = await productModel.findById(id)

    const updatedStock = product.stock -= quantity*1

    product.stock = updatedStock

   await product.save({ validateBeforeSave: false })

}


