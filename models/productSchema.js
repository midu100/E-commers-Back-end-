const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
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
           attributes : {
             size : {
                type : String,
                required : true,
                enum : ['S','M','L','XL','XXL','3XL']
            },
            color : {
                type : String,
                required : true
            },
            stock : {
                type : String,
                required : true
            }
           }
        }
    ],
    tags : {
        type : Array
    },
    thumbnail : {
        type : String,
        required : true
    },
    images : {
        type : Array
    },
    isActive : {
        type : Boolean,
        default : false
    }
})




module.exports = mongoose.model('product',productSchema)