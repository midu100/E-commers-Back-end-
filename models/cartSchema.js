const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    subTotal: {
        type: Number,
        required: true
    }
});


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true  
    },
    items: [cartItemSchema],
    totalItems : {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

cartSchema.pre('save',function(){
    this.totalItems = this.items.reduce((acc,items)=> acc + items.quantity,0)
    this.totalPrice = this.items.reduce((acc,items)=> acc + items.subTotal,0)
})


module.exports = mongoose.model("Cart", cartSchema);