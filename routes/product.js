const express = require('express')
const { createProduct, getProductList, getProductDetails, updateProduct } = require('../controllers/productControlle')
const multer = require('multer')
const { authMiddleware } = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const upload = multer()
const route = express.Router()

route.post('/upload',authMiddleware,roleCheckMiddleware('admin','editor'),upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'images', maxCount: 4 },]),createProduct)
route.get('/allproducts',getProductList)
route.get('/:slug',getProductDetails)
route.put('/updateproduct/:slug',authMiddleware,roleCheckMiddleware('admin','editor'),upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'images', maxCount: 4 }]),updateProduct)


module.exports = route