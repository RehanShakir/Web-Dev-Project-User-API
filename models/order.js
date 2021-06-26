const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    ph_number: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "order-placed",
    },
  },
  { timestamps: true }
);

const OrderModel = new mongoose.model("Order", orderSchema);

module.exports = OrderModel;
