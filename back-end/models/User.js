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
    },
    newMessages: {
        type: Object,
        default: {}
    }
}, {minimize: false});

// pre save middleware
UserModel.pre("save", function(next) {
    const user = this;
    // before saving hash user password
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, function (error, salt) {
        if (error) return next(error);

        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) return next(error);
            user.password = hash;
            next();
        });
    });
});

UserModel.static.userAlreadyRegistered = async(email) => {
    return ! await User.findOne({email}) ? false : true;
}
UserModel.static.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) throw new Error("Invalid email or password");
    
    let alreadyExisting = await bcrypt.compare(password, user.password);
    if (!alreadyExisting) throw new Error("Invalid email or password");
    return user;
}

UserModel.methods.toJson = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password; // no need for password.
    return userObject;
}
const User = mongoose.model("User", UserModel);
module.exports = User;