const express = require('express')
const route = express.Router()
const authRoute = require('./auth') 
const categoryRoute = require('./category')
const productRoute = require('./product')

route.use('/auth',authRoute)
route.use('/category',categoryRoute)
route.use('/product',productRoute)

route.get('/',(req,res)=>{
    res.send('hello')
})

module.exports = route