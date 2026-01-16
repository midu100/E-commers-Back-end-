const express = require('express')
const { signUp, verifyOTP, resendOTP, signIn, forgotPass, ressetPassword } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')
const route = express.Router()


route.post('/signup',signUp)
route.post('/verifyotp',verifyOTP)
route.post('/resendotp',resendOTP)
route.post('/signin',signIn)
route.post('/forgotPass',forgotPass)
route.post('/resetPass/:token',ressetPassword)


module.exports = route