const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    thumbnail : {
        type : String,
        required : true,
    },
    description :{
        type:String
    },
    isActive : {
        type : String,
        default : true
    }
})

module.exports = mongoose.model('category',categorySchema)