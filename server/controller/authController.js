const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const User = require("../models/User")

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: "Invalid Credentials" })

    const foundUser = await User.findOne({ email: email })
    if (!foundUser) return res.status(401).json({ message: "Unauthorized User" })

    const matchPwd = await bcryptjs.compare(password, foundUser.password)
    if (matchPwd && email === foundUser.email) {
        const roles = Object.values(foundUser.roles).filter(Boolean)
        // 1. Create an access token
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    email: foundUser.email,
                    roles: foundUser.roles
                },
            },
            process.env.ACCESS_SECRET,
            { expiresIn: "10m" }
        )
        // 2. Create a refresh token
        const refreshToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    email: foundUser.email,
                    roles: foundUser.roles
                },
            },
            process.env.REFRESH_SECRET,
            { expiresIn: "1d" }
        )
        // 3. Save refresh token with current user
        foundUser.refreshToken = refreshToken
        await foundUser.save()
        // 4. Save a cookie in client side
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ roles, accessToken, refreshToken, success: true, username: foundUser.username, isVerified: foundUser.isVerified, email: foundUser.email })
    } else {
        return res.sendStatus(401)
    }
}

module.exports = handleLogin