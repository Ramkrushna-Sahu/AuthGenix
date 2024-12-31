const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    profileImage: {
        type: Buffer
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    roles: {
        User: {
            type: Number,
            default: 2001,
        },
        Editor: Number,
        Admin: Number,
    },
    refreshToken: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    socialLogin: {
        type: Boolean,
    }
});

const User= mongoose.model('users',UserSchema);
module.exports= User;