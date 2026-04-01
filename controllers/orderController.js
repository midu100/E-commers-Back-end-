const cartSchema = require("../models/cartSchema");
const orderSchema = require("../models/orderSchema");
const responseHandler = require("../utils/responseHandler");
const stripe = require("stripe")(`${process.env.STRIPE_SEC_KEY}`);

const checkOut = async (req, res) => {
  // cartId = 69aaaa14ababfd6de7c353de
  const { paymentType, cartId, shippingAddress, insideDhaka } = req.body;
  const orderNumber = `KAZI-${Date.now()}`;
  if (!paymentType)
    return responseHandler.error(res, "Payment type is required.");
  if (!shippingAddress)
    return responseHandler.error(res, "Shipping Address is required.");
  if (!typeof insideDhaka === "undefined")
    return responseHandler.error(res, "Please select your area");

  try {
    if (!cartId) return responseHandler.error(res, "Invalid Request", 400);

    const cartData = await cartSchema.findOne({ _id: cartId });
    if (!cartData) return responseHandler.error(res, "Invalid request");
    console.log(cartData);

    const charge = insideDhaka === "true" ? 80 : 120;
    const totalPrice = cartData.items.reduce((initial, current) => {
      return (initial += current.subTotal);
    }, charge);

    const orderData = new orderSchema({
      user: req.user._id,
      items: cartData.items,
      shippingAddress,
      insideDhaka,
      deliveryCharge: charge,
      totalPrice,
      payment: {
        method: paymentType,
      },
      orderNumber,
    });
    orderData.save();

    if (paymentType === "cash") {
      return responseHandler.success(res, "Order placed successfully.");
    }

    // For online payment
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: "T-Shirt",
              description: `Blue T-Shirt with chest print`,
            },
            unit_amount: 500 * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: `${req.user.email}`,
      success_url: `https://example.com/success`,
      cancel_url: `https://example.com/error`,
    });

    console.log(session)

    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkOut };
