const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");
const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const cloudinary = require('cloudinary');
const { isAuthenticatedUser } = require("../middleware/auth");

// register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:"scale"
    })
    const {name, email, password} = req.body;

    const user = await userModel.create({
        name,
        email,
        password,
        avatar: {
            public_id:  myCloud.public_id,
            url:  myCloud.secure_url,
        },
    });

    sendToken(user, 200, res);
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("email or password is missing", 400));
    }

    const user = await userModel.findOne({email}).select("+password");

    if (!user) {
        return next(
            new ErrorHandler("Invalid email or password user not found", 401)
        );
    }

    const isPasswordMatched = await user.camparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

//logOut user

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .status(200)
        .json({
            success: true,
            message: "Logged out user successfully",
        });
});

// forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await userModel.findOne({email: req.body.email})
    if (!user) {
        return next(new ErrorHandler('email not found'), 404)
    }

    // get reset password token reset

    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave: false})

    // req.protocol for http / https it can be either one of it
    // req.get('host') for domain name like localhost for this case

    const resetPasswordURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const resetPasswordMessage = `your password token is :- \n\n ${resetPasswordURL} \n\n id you have not requested this email then please ignore it`

    try {
        await sendEmail({

            email: user.email,
            subject: 'ecommerce password recovery',
            message:resetPasswordMessage
        })
        res.status(200).json({
            success: true,
            message: `email send to ${user.email} successfully`
        })

    } catch (err) {
        user.getResetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        return next(new ErrorHandler(err.message, 500))
    }
})

// reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // hashing
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const {password,confirmPassword} = req.body

    const user = await userModel.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})

    if(!user){
        return next(
            new ErrorHandler("reset password token is invalid or has been expired", 401)
        );
    }
    if(password !== confirmPassword){
        return next(
            new ErrorHandler("password does not match", 401)
        );

    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    //once the user has changed its password it will be logged in automatically

   sendToken(user,200,res)
})

// get single user detail

exports.getOneUserDetails = catchAsyncError(async (req,res,next)=>{

    // req.use is an object that we saved in isAuthenticatedUser Middleware
    // if user is logged in than it will get the id ans stays logged in

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })

})


// update password

exports.changePassword= catchAsyncError(async (req,res,next)=>{

    const{oldPassword,newPassword,confirmPassword} = req.body

    const user = await userModel.findById(req.user.id).select("+password")

    if(!user){
        return next(
            new ErrorHandler("user not found", 401)
        );
    }

    const isPasswordMatched = await user.camparePassword(oldPassword);

    if(!isPasswordMatched){
        return next(
            new ErrorHandler("OLD password is incorrect", 401)
        );
    }

    if(newPassword !== confirmPassword){
        return next(
            new ErrorHandler("new password and confirm does not match", 401)
        );
    }

    user.password = newPassword

   await user.save()


  sendToken(user,200,res,'password changed successfully')

})

// update profile

exports.changeProfile= catchAsyncError(async (req,res,next)=>{

    const{name,email,} = req.body

    const newProfileData = {
        name,
        email
    }

    // will add cloudinary later
    const user = await userModel.findByIdAndUpdate(req.user.id,newProfileData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })


   res.status(200).json({
       success:true,
       message:"updated userProfile successfully",
       user
   })

})

// update role

exports.updateUserRole= catchAsyncError(async (req,res,next)=>{

    const{name,email,role} = req.body

    const newProfileData = {
        name,
        email,
        role
    }

    // will add cloudinary later
    const user = await userModel.findByIdAndUpdate(req.user.id,newProfileData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })


    res.status(200).json({
        success:true,
        message:"updated userProfile successfully",
        user
    })

})

// get all users (admin)

exports.getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await userModel.find()

    res.status(200).json({
        success:true,
        "number of users":users.length,
        users

    })
})

// get single user (admin)

exports.getoneUserAdmin = catchAsyncError(async (req,res,next)=>{
    const user = await userModel.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`user with id: ${req.params.id} does not exist`,404))
    }

    res.status(200).json({
        success:true,
        user

    })
})

// delete user

exports.deleteUser = catchAsyncError(async (req,res,next)=>{
   const user =await userModel.findByIdAndDelete(req.params.id)

    // will remove cloudinary later
    if(!user){
        return next(new ErrorHandler(`user with id: ${req.params.id} does not exist`))
    }

    res.status(505).json({
        success:true,
        message:`deleted user: ${user.name} successfully`,
        user
    })
})

