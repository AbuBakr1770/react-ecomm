const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must have a name"],
        maxLength: [30, "user name must not exceed 30 characters"],
        minLenght: [4, "name should have at leats 5 characters"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "user must have an email"],
        unique: [true, "you can not use the same email twice"],
        validate: [validator.isEmail, "please enter a valid email"],
    },

    password: {
        type: String,
        required: [true, "user must have a pasword"],
        minLenght: [8, "password should have at leats 8 characters"],
        select: false,
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    roll: {
        type: String,
        default: "user",
    },

    resetPasswordToken: {
        type: String,
    },

    resetPasswordExpire: {
        type: Date,
    },
});

// hash the password using bcrypt before(pre) saving in the DB
// using "function" keyword because can not use "this" keyword in arrow function syntax
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// generate JWT token

userSchema.methods.getJWTToken = function () {
    // .sign need 3 parameters
    //1st some payload for later identification
    //2nd a secret key
    //3rd an expiry time
    return JWT.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare passwords

userSchema.methods.camparePassword = async function (enteredPassword) {
    return await  bcrypt.compare(enteredPassword, this.password);
};

// generatijng password resetting methoed

userSchema.methods.getResetPasswordToken = function () {

    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // hashing
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // add to userScheme
    this.resetPasswordExpire = Date.now() + (15 * 60 * 1000)

    return resetToken

}

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
