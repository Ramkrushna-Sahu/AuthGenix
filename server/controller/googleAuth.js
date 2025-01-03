const User = require("../models/User")
const axios = require('axios')
const jwt = require('jsonwebtoken')

const googleAuth = async (req, res) => {
    try {
        const { googleAccessToken } = req.body
        if (!googleAccessToken) {
            return res.status(400).json({ message: "insufficient agruments are required." });
        }
        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${googleAccessToken}`,
            },
        }).then(async (response) => {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;
            // const picture = response.data.picture;

            let existingUser = await User.findOne({ email });

            if (!existingUser) {
                const result = await User.create({
                    isVerified: true,
                    email,
                    username: firstName + lastName,
                    socialLogin: true,
                });
                existingUser = result;
            }
            const roles = Object.values(existingUser.roles).filter(Boolean);
            const authToken = jwt.sign(
                {
                    UserInfo: {
                        username: firstName + lastName,
                        email: email,
                        roles: roles,
                    },
                },
                process.env.ACCESS_SECRET,
                { expiresIn: "10m" }
            );
            const refreshToken = jwt.sign(
                {
                    username: firstName + lastName,
                    email: existingUser.email,
                    roles: roles,
                },
                process.env.REFRESH_SECRET,
                { expiresIn: "1d" }
            );
            existingUser.refreshToken = refreshToken
            await existingUser.save()
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                email: existingUser.email,
                username: existingUser.username,
                roles,
                success: true,
                accessToken: authToken,
            });
        })
            .catch((e) => {
                console.log(e);
                res.status(400).json({ message: "Invalid access token!" });
            });
    } catch (error) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = googleAuth