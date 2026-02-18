const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Types.ObjectId,
        ref: 'category',
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discountPercentage : {
        type : Number,
        default : 0
    },
    variants : [
        {
            sku : {
                type : String,
                required : true,
                unique : true
            },
            size : {
               type : String,
               required : true,
               enum : ['S','M','L','XL','XXL','3XL','s','m','l','xl','xxl','3xl']
           },
           color : {
               type : String,
               required : true
           },
           stock : {
               type : Number,
               required : true
           }
           
        }
    ],
    tags : [
        {
            type : String
        }
    ],
    thumbnail : {
        type : String,
        required : true
    },
    images : [
        {
            type : String
        }
    ],
    isActive : {
        type : Boolean,
        default : false
    }
})




module.exports = mongoose.model('product',productSchema)