const cartSchema = require("../models/cartSchema");
const productSchema = require("../models/productSchema");
const responseHandler = require("../utils/responseHandler");

const addToCart = async (req, res) => {
  try {
    const { productId, sku, quantity } = req.body;
    if (!productId || !sku || !quantity) return responseHandler.error(res, "Invalid Request", 400);

    const productData = await productSchema.findById(productId);
    
    // Subtotal calculation
    const discountAmount =(productData.price * productData.discountPercentage) / 100;
    const discountPrice = productData.price - discountAmount;
    const subTotal = discountPrice * quantity;

    // Exist cartItem
    const existingCart = await cartSchema.findOne({ user: req.user._id });
    if (existingCart) {
      const alreadyExist = await existingCart.items.some(
        (pItem) => pItem.sku === sku,
      );
      if (alreadyExist) return responseHandler.error(res, "Product already exist in cart.");

      existingCart.items.push({
        product: productId,
        sku,
        quantity,
        subTotal,
      });
      existingCart.save()
      return responseHandler.success(res, "Product Addedd", 201);
    }
    
    // Success
    const cartData = new cartSchema({
      user: req.user._id,
      items: [
        {
          product: productId,
          sku,
          quantity,
          subTotal,
        },
      ],
    });
    await cartData.save()

    return responseHandler.success(res, "Product Added", 201);
  } catch (error) {
    console.log(error);
  }
};

const getUserCart =async(req,res)=>{
  try {
    const cart = await cartSchema.findOne({user:req.user._id})

    console.log(cart)

    responseHandler.success(res,'Success',cart)
  }
   catch (error) {
     console.log(error)  
  }
}

const updateCart = async(req,res)=>{
  try {
    const{productId,itemId,quantity} = req.body
    
    if(quantity < 1) return responseHandler.error(res,'Minimum 1 item is required',400)
    if(!productId || !itemId || !quantity) return responseHandler.error(res,'Invalid request' ,400)

    const productData = await productSchema.findById(productId)
    const discountAmount = (productData.price * productData.discountPercentage) / 100
    const discountPrice = productData.price - discountAmount
    const subtotal = discountPrice * quantity

    const cart = await cartSchema.findOneAndUpdate({user : req.user._id,"items._id" : itemId},{$set:{"items.$.quantity":quantity,"items.$.subTotal" : subtotal}},{new:true})

    return responseHandler.success(res,"Cart Updated",cart)
  }
   catch (error) {
     console.log(error)  
  }
}


const removeFromCart = async(req,res)=>{
  try {
    const{itemId} = req.body

    if(!itemId) return responseHandler.error(res,'Invalid request' ,400)

    const cart = await cartSchema.findOneAndUpdate({user : req.user._id,"items._id" : itemId},{$pull :{items : {_id:itemId}}},{new:true})

    return responseHandler.success(res,"Item removed",cart)
    
  } 
  catch (error) {
     console.log(error)  
  }
}

module.exports = { addToCart ,getUserCart,updateCart,removeFromCart};
