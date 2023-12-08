const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const conntectToDB =  () =>{
    
 mongoose.connect(process.env.DB_WITH_PASS,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true
    }).then((data)=>{
        console.log(`DB connected Successfully ${data.connection.host}`);
    })
}

module.exports = conntectToDB