const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const sendEmail = require("./sendEmail")

const sendVerificationMail = async (req, res) => {
    try {
        const { email } = req.body
        const id = User.findOne({ email }).select("_id")

        const mail = await sendEmail(email, "forgot", id)
        return res.json({
            message: "verification Email has been sent!",
            success: true,
            mail,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const verifyForgotPasswordUser = async (req, res) => {
    try {

        const { token, password } = req.body
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid token", success: true });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        await User.findOneAndUpdate(
            {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: { $gt: Date.now() },
            },
            {
                isVerified: true,
                forgotPasswordToken: undefined,
                forgotPasswordTokenExpiry: undefined,
                password: hashedPassword,
            }
        );
        return res.json({
            message: "Password changed successfully!",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

module.exports = {sendVerificationMail, verifyForgotPasswordUser}