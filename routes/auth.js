const express = require('express')
const multer  = require('multer')
const { signUp, verifyOTP, resendOTP, signIn, forgotPass, ressetPassword, getUserProfile, updateUserProfile, refreshToken } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')
const route = express.Router()

const upload = multer()


route.post('/signup',signUp)
route.post('/verifyotp',verifyOTP)
route.post('/resendotp',resendOTP)
route.post('/signin',signIn)
route.post('/forgotPass',forgotPass)
route.post('/resetPass/:token',ressetPassword)
route.get('/profile',authMiddleware,getUserProfile)
route.put('/profile',authMiddleware,upload.single('avatar'), updateUserProfile)
route.post('/refreshtoken',refreshToken)


module.exports = route