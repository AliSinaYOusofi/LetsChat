const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");


const UserModel = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "Can't be empty"]
    },

    username: {
        type: String,
        required: [true, "Can't be empty"]
    },

    email: {
        type: String,
        required: [true, "Can't be empty"],
        lowercase: true,
        unique: true,
        index: true,
        validate: [isEmail, "is not an email"]
    },

    password: {
        type: String,
        required: [true, "Can't be empty"]
    },

    status: {
        type: String,
        default: "online"
    }
});

const User = mongoose.model("User", UserModel);
module.exports = User;