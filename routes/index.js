const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/shop", (req, res) => {
  res.render("shop");
});
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

module.exports = router;
