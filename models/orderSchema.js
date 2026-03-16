const { default: mongoose } = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  subTotal: {
    type: Number,
    required: true,
  },
});

const paymentSchema = new mongoose.Schema({
  payMethod: {
    type: String,
    enum: ["Bkash", "Nagad", "Stripe", "SSLCommerz", " Cash"],
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "BDT",
  },
  paidAt: Date,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      type: String,
      required: true,
    },
    insideDhaka: {
      type: Boolean,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    payment: paymentSchema,
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = "ORD-" + Date.now();
  }
  next();
});

module.exports = mongoose.model("order", orderSchema);
