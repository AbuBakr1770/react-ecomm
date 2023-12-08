

// pakages imports
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const body_parser = require('body-parser')
const fileUpload = require('express-fileupload')


// routes imports
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
const orderRouter = require('./routes/orderRoutes')

// middle ware imports
const errorMiddleware = require('./middleware/error')
const isAuthenticatedUser = require('./middleware/auth')


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(body_parser.urlencoded({extended:true}));
app.use(fileUpload());
// app.use(isAuthenticatedUser())



app.use('/api/v1', productRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', orderRouter)
app.use(errorMiddleware)

module.exports = app