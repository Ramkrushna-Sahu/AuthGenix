const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const User = require("../models/User")

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies?.jwt
    const foundUser = await User.findOne({ refreshToken })
    console.log(foundUser)
    if (!foundUser) return res.sendStatus(401)

    const response = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    console.log('response:',response)
    if (foundUser.username != (response.UserInfo?.username || response?.username)) {
        return res.sendStatus(403)
    }
    const roles = Object.values(foundUser.roles)
    const accessToken = jwt.sign(
        {
            UserInfo: {
                username: response.UserInfo?.username || response?.username,
                email: response.UserInfo?.email || response?.email,
                roles: roles,
            },
        },
        process.env.ACCESS_SECRET,
        { expiresIn: "72h" }
    )
    res.json({ roles, accessToken, email: foundUser.email, username: foundUser.username })
}

module.exports = handleRefreshToken