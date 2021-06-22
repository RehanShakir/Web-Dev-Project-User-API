const express = require("express");
const router = express.Router();

//const authController = require("../app/http/authController");
const cartController = require("../app/http/customers/cartController");
const shopController = require("../app/http/shopController");
const authentication = require("../app/middlewares/userAuthentication");

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

router.get("/allProducts", (req, res) => {
  res.render("allProducts");
});
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

// router.get("*", (req, res) => {
//   res.render("404", {
//     errorcomment: "Opps, Page Not Found",
//   });
// });

module.exports = router;
