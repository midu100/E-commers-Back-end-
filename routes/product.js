const express = require('express')
const { createProduct } = require('../controllers/productControlle')
const multer = require('multer')
const { authMiddleware } = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const upload = multer()
const route = express.Router()

route.post('/upload',authMiddleware,roleCheckMiddleware('admin','editor'),upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'images', maxCount: 4 },]),createProduct)



module.exports = route