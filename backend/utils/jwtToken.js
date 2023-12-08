// creating token and saving cookie

const sendToken = (user,statusCode,res,message) =>{

    let token = user.getJWTToken()

    // option for cookie

    const option = {
        httpOnly:true,
        expires: new Date(
            Date.now() +  process.env.COOKIE_EXPIRE * 24*60*60*1000 //5 days
        ),
    }

    res.status(statusCode)
    .cookie('token',token,option)  // setting cookie 1st is cookie name 2nd is cookie value and 3rd is cookie options
    .json({
        success:true,
        user,
        message:message || '',
        token
    })
}


module.exports = sendToken