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

module.exports = { addToCart };
