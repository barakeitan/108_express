const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cart: {
    totalQty: {
      type: Number,
      default: 0,
      required: true,
    },
    totalCost: {
      type: Number,
      default: 0,
      required: true,
    },
    currency: {
      type: String,
      default: "USD", 
      enum: ["USD", "ILS", "EUR"]
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          default: 0,
        },
        title: {
          type: String,
        },
        productCode: {
          type: String,
        },
      },
    ],
  },
  cardholder: {
    type:String,
    required:true,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Accepted", "Shipped", "In transit", "Delivered"],
    default: "Accepted",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
