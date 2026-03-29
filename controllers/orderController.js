const cartSchema = require("../models/cartSchema")
const orderSchema = require("../models/orderSchema")
const responseHandler = require("../utils/responseHandler")

/* {
  _id: new ObjectId('69aaaa14ababfd6de7c353de'),
  user: new ObjectId('698f5e5f49aeb275e1edaba3'),
  items: [
    {
      product: new ObjectId('698f66eba5fbce2c2aa468b2'),
      sku: 'sku-2',
      quantity: 3,
      subTotal: 2670,
      _id: new ObjectId('69b7924f3b6ec6b609461703')
    },
    {
      product: new ObjectId('698f6329b4beffc0781848d6'),
      sku: 'sku-1',
      quantity: 10,
      subTotal: 18000,
      _id: new ObjectId('69b7945a945986770a8ed5c4')
    }
  ],
  totalItems: 13,
  createdAt: 2026-03-06T10:19:00.096Z,
  updatedAt: 2026-03-16T05:25:46.778Z,
  __v: 2
} */

const checkOut =async(req,res)=>{
    // cartId = 69aaaa14ababfd6de7c353de
    const {paymentType,cartId,shippingAddress,insideDhaka} = req.body
    const orderNumber = `KAZI-${Date.now()}`
    if(!paymentType) return responseHandler.error(res,'Payment type is required.')
    if(!shippingAddress) return responseHandler.error(res,'Shipping Address is required.')
    if(!typeof insideDhaka === "undefined") return responseHandler.error(res,'Please select your area')

    try {
        if(!cartId) return responseHandler.error(res,'Invalid Request',400)
        
        const cartData = await cartSchema.findOne({_id : cartId})
        if(!cartData) return responseHandler.error(res,'Invalid request')
        console.log(cartData)
        
        const charge = insideDhaka === 'true' ? 80 : 120
        const totalPrice = cartData.items.reduce((initial,current)=>{
            return initial += current.subTotal
        },charge)

        const orderData = new orderSchema({
            user : req.user._id,
            items : cartData.items,
            shippingAddress,
            insideDhaka ,
            deliveryCharge : charge,
            totalPrice,
            payment : {
                method : paymentType
            },
            orderNumber
        })
        orderData.save()

        if(paymentType === 'cash'){
            return responseHandler.success(res,'Order placed successfully.')
        }

        
    } 
    catch (error) {
      console.log(error)    
    }

}


module.exports = {checkOut}