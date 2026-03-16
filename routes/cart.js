const express = require('express')
const { addToCart, getUserCart, updateCart, removeFromCart } = require('../controllers/cartController')
const { authMiddleware } = require('../middleware/authMiddleware')
const route = express.Router()

route.post('/add',addToCart)
route.get('/get',getUserCart)
route.put('/updatecart',updateCart)
route.delete('/delete-item',removeFromCart)


module.exports = route