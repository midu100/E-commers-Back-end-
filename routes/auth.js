const express = require('express')
const { signUp } = require('../controllers/authController')
const route = express.Router()


route.post('/signup',signUp)


module.exports = route