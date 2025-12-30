const express = require('express')
const route = express.Router()
const authRoute = require('./auth') 

route.use('/auth',authRoute)

route.get('/',(req,res)=>{
    res.send('hello')
})

module.exports = route