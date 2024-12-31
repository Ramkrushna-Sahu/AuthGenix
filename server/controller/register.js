const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const sendEmail = require("./sendEmail")
const mongoose = require("mongoose")
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const duplicateUsername = await User.findOne({ username: username })
        if (duplicateUsername) return res.sendStatus(409);
        const duplicateEmail = await User.findOne({ email: email })
        if (duplicateEmail) return res.sendStatus(409);

        const hashedPassword = await bcryptjs.hash(password, 10)
        // console.log(hashedPassword)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        // console.log(newUser);
        const mail = await sendEmail(email, "verify",  newUser._id)
        // console.log("after sending mail")
        // console.log(mail)
        res.status(201).json({ success: true, message: "user created successfully", mail, username: newUser.username, email: newUser.email })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

const verifyUser = async (req, res) => {
    try {
        const reqBody = req.body;
        const { token } = reqBody
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) return res.status(400).json({ success: false, message: "Invalid Token" })

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return res.json({
            message: "email Verified!",
            success: true,
        });
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

module.exports = {registerUser, verifyUser}