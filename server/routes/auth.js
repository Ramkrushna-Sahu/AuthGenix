const express = require("express")
const router = express.Router()
const handleLogin = require("../controller/authController")
const googleAuth = require('../controller/googleAuth')

router.post("/", handleLogin)
router.post("/google", googleAuth)

module.exports = router