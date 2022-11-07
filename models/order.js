const mongoose = require("mongoose");
const { checkCurrency } = require("../public/js/currency");
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
      validate: (currency) => {
        return checkCurrency(currency);
      }
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
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number
  },
  paymentId: {
    type: String,
    required: true,
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
