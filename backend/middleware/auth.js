const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{

    const token = req.cookies.token;

   if(!token){
    return next(new ErrorHandler('please login to access this resource',401))
   }

   const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    // here we are saving the whole user in req.user object
    // this will help us later in authentication

   req.user =  await userModel.findById(decodedData.id)

   next()

  
})

exports.authorizedRole = (...roles) => {

    return  (req,res,next)=>{

        if(!roles.includes(req.user.roll)){
            return  next(new ErrorHandler(`User of type:[${req.user.roll}] is not allowed to access this resource`,403))
        }

        next()
    }


}

