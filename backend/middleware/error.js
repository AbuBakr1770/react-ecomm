
const ErrorHandler = require('../utils/errorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'internal server error'

    // if(err.name === "CastError"){
    //     const message = 'cast error occurred'
    //
    //     err = new ErrorHandler(message,400)
    //
    // }

    //If user email enter same email twice

    if(err.code === 11000){

        let val =Object.keys(err.keyValue)

        let message = `duplicate  ${val} Entered`

        err = new ErrorHandler(message,400)


    }

    // if json web token is corrupted

    if(err.name === 'JsonWebTokenError'){

        let message = `invalid Json Web Token`

        err = new ErrorHandler(message,400)


    }

    // if jwt has been expired

    if(err.name === 'TokenExpiredError'){

        let message = ` Json Web Token has been expired`

        err = new ErrorHandler(message,400)


    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        // location:err.compact
    })
}