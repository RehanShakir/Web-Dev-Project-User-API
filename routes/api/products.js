const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const ProductModel = require("../../models/product");

//Storage
const storage = multer.diskStorage({
  destination: "./assets/images",
  filename: (req, file, callback) => {
    return callback(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

/*Get All Products */
router.get("/", async (req, res) => {
  let Products = await ProductModel.find();
  return res.send(Products);
});

/*  Get One Product */
router.get("/:id", async (req, res) => {
  let Product = await ProductModel.findById(req.params.id);
  return res.send(Product);
});

/* POST A NEW PRODUCT */
router.post("/", upload.single("productImage"), async (req, res) => {
  try {
    let Product = new ProductModel();
    Product.name = req.body.name;
    Product.price = req.body.price;
    Product.category = req.body.category;
    Product.tags = req.body.tags;
    Product.productImage = `https://my-shop-rest-api.herokuapp.com/productImage/${req.file.filename}`;

    await Product.save();
    return res.send(Product);
  } catch (error) {
    res.send(error);
  }
});

/*Update A Product */
router.put("/:id", upload.single("productImage"), async (req, res) => {
  let Product = await ProductModel.findById(req.params.id);

  Product.name = req.body.name;
  Product.price = req.body.price;
  Product.category = req.body.category;
  Product.tags = req.body.tags;
  Product.productImage = `https://my-shop-rest-api.herokuapp.com/productImage/${req.file.filename}`;

  await Product.save();
  return res.send(Product);
});

/*Delete a Product */
router.delete("/:id", async (req, res) => {
  let Product = await ProductModel.findByIdAndDelete(req.params.id);
  return res.send(Product);
});

module.exports = router;
