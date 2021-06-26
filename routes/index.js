const express = require("express");
const router = express.Router();

//const authController = require("../app/http/authController");
const cartController = require("../app/http/customers/cartController");
const shopController = require("../app/http/shopController");
const authentication = require("../app/middlewares/userAuthentication");
const orderController = require("../app/http/customers/orderController");
const adminController = require("../app/http/admin/orderController");

//console.log(auth.userAuth);
router.get("/", shopController().index);
router.get("/shop", shopController().shop);
router.get("/about-us", (req, res) => {
  res.render("about-us");
});
router.get("/contact-us", (req, res) => {
  res.render("contact-us");
});

router.get("/allProducts", shopController().admin);
router.get("/cart", cartController().cart);
router.post("/update-cart", cartController().update);
router.get("/admin", authentication.checkAuthenticated, (req, res) => {
  res.render("admin");
});

router.get("/login", authentication.checkNotAuthenticated, (req, res) => {
  res.render("login");
});
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.get("/register", authentication.checkNotAuthenticated, (req, res) => {
  res.render("register");
});

//Customer Routes
router.post("/orders", authentication.userAuth, orderController().order);
router.get(
  "/customers-orders",
  authentication.userAuth,
  orderController().index
);

//Admin routes
router.get("/admin-orders", authentication.userAuth, adminController().index);
router.get("/adminLogin", authentication.checkNotAuthenticated, (req, res) => {
  res.render("adminLogin");
});

module.exports = router;
