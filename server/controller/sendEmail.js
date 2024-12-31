const nodemailer = require("nodemailer")
const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const User = require("../models/User")
// const dotenv = require('dotenv')
// dotenv.config()
const sendEmail = async (email, emailType, userID) => {
    try {
        console.log(process.env.DOMAIN)
        // const salt = bcryptjs.genSalt(10);
        // console.log(email, emailType, userID)
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);
        // console.log(hashedToken)
        if (emailType === "verify") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if (emailType === "forgot") {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            // auth: {
            //     user: process.env.EMAIL,
            //     pass: process.env.PASSWORD,
            // },
            auth: {
                user: process.env.LOGIN,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: emailType === 'verify' ? 'Account verification email!' : 'Reset password email!',
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "verify" ? "verifyEmail" : "resetPassword"
                }?token=${hashedToken}">here</a> to ${emailType === "verify" ? "verify your email" : "reset your password"
                } or copy and paste the link below in your browser. <br> ${process.env.DOMAIN
                }/${emailType === "verify" ? "verifyEmail" : "resetPassword"
                }?token=${hashedToken} </p>`
        };
        // console.log(mailOptions)

        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return { ...error, success: false };
            } else {
              console.log("Email sent: " + info.response);
              return { ...info, success: true };
            }
          });

    } catch (e) {
        return {errors: e}
    }
}

module.exports = sendEmail