const Product = require("../../models/product");
function shopController() {
  return {
    async shop(req, res) {
      const products = await Product.find();
      return res.render("shop", { products: products });
    },
    async admin(req, res) {
      const products = await Product.find();
      return res.render("allProducts", { products: products });
    },
    async index(req, res) {
      const products = await Product.find();
      return res.render("index", { products: products });
    },
  };
}

module.exports = shopController;
