const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter product Name'],
        trim:true
    },
   
    description:{
        type:String,
        required:[true,'Please enter product Description']
    },
   
    price:{
        type:Number,
        required:[true,'Please enter product Price'],
        maxLegth:[8,'Price can con exceed 8 characters']
    },

    ratings:{
        type:Number,
        default:0,
    },

    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }

    }],

    category:{
        type:String,
        required:[true,'A product must have at least one category']
    },

    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
    },

    stock:{
        type:Number,
        required:[true,'Please enter product stock quantity'],
        maxLength:[4,'stock can not exceed 10,000'],
        default:5
    },

    noOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                required:true,
                ref:"userModel",
            },

            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
        }
    ],

    createdAt:{
        type:Date,
        default:Date.now
    }

})

const productModel = mongoose.model('productModel', productSchema)

module.exports = productModel