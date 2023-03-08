const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// creating an account on chatty
router.post("/signup", async (req, res) => {
    
    try {
        const {full_name, username, email, password} = req.body;
        const user = await User.create({
            full_name,
            username,
            email,
            password: await bcrypt.hash(password, bcrypt.genSaltSync(10))
        });
        res.status(201).json({message: "created"});
    } catch (error) {
        let msg
        if (error.code == 11000) msg = "user already reged";
        else msg = error.message;
        res.status(400).json(msg);
    }
});

module.exports = router;