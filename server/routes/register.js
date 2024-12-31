const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { registerUser, verifyUser } = require('../controller/register')

router.post("/",
    [
        body("username", 'Username must be atleast 3 characters').isLength({ min: 3 }),
        body("email", 'Enter a valid Email').isEmail(),
        body("password", 'Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number & 1 symbol').isStrongPassword({
            minLength: 8,
            minUppercase: 1,
            minLowercase:1,
            minNumbers: 1,
            minSymbols: 1,
        }),
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }
        await registerUser(req, res)
    }
)

router.post("/verify", verifyUser);

module.exports = router