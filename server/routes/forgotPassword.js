const express = require("express")
const router = express.Router()
const {sendVerificationMail, verifyForgotPasswordUser} = require('../controller/forgotPasswordController')

router.post("/forgotpassword", sendVerificationMail);
router.post("/verifypassword", verifyForgotPasswordUser);

module.exports = router