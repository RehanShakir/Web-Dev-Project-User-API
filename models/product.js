const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  stock: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

const ProductModel = new mongoose.model("Product", productSchema);

module.exports = ProductModel;
