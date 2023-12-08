const nodeMailer = require('nodemailer')


sendEmail = async (options) =>{

    const transporter = nodeMailer.createTransport({

        // Here, the original pass will not work; you will need app pass that is generated from  the Google manage email page
        // got to security -> 2 step verification -> at the bottom you will see App Passwords -> go there and generate a pass and copy it on the spot because it can only be accessed once


        service:process.env.SMPT_SERVICE,
        secure:false,
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_MAIL_PASS
        }
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions)
}


module.exports = sendEmail