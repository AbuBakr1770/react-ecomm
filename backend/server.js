const app = require('./app')
const dotenv = require('dotenv')
const connectToDB = require('./config/connectToDB')
const cloudinary = require('cloudinary')

dotenv.config({path: 'backend/config/config.env'})

connectToDB()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})


const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on port:${process.env.PORT}`);
})

// unhandled var


process.on('uncaughtException', (err) => {
    console.log(`Error ${err}`);
    console.log(`Server stopped due to uncaught expression ${err}`);

    server.close(() => {
        process.exit(1)
    })
})


// unhandled promise error

process.on('unhandledRejection', err => {
    console.log(`An error occurred ${err}`);
    console.log('shutting down due to unhandled promise');

    server.close(() => {
        process.exit(1)
    })
})