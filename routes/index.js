const express = require("express");
const router = express.Router();

const authController = require("../app/http/authController");
const cartController = require("../app/http/customers/cartController");
const shopController = require("../app/http/shopController");

//console.log(auth.userAuth);
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/shop", shopController().shop);
router.get("/about-us", (req, res) => {
  res.render("about-us");
});
router.get("/contact-us", (req, res) => {
  res.render("contact-us");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/allProducts", (req, res) => {
  res.render("allProducts");
});
router.get("/cart", cartController().cart);
router.post("/update-cart", cartController().update);
router.get("/admin", authController().login);



// router.get("*", (req, res) => {
//   res.render("404", {
//     errorcomment: "Opps, Page Not Found",
//   });
// });

module.exports = router;
