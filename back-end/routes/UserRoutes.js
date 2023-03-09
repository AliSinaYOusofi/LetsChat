const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// creating an account on chatty
router.post("/signup", async (req, res) => {
    
    try {
        const {full_name, username, email, password} = req.body;

        // first checking if user is already registered
        const user = await User.create({
            full_name,
            username,
            email,
            password
        });
        res.status(201).json({message: "created"});
    } catch (error) {
        let msg
        if (error.code == 11000) msg = "user already reged";
        else msg = error.message;
        res.status(400).json(msg);
    }
});

router.post("/login", async (req, res) => {
    console.log("got one", req.body);
    const {email, password} = req.body;
    
})

module.exports = router;