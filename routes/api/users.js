const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../../models/user");
let userAuth = false;
/* GET users listing. */
router.get("/", async (req, res) => {
  let Users = await UserModel.find();
  return res.send(Users);
});

/*Get One User */
router.get("/:id", async (req, res) => {
  let User = await UserModel.findById(req.params.id);
  return res.send(User);
});

/*Post New User */
router.post("/register", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) return res.status(404).send("User Already Registered");

    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;

    if (password === confirmPassword) {
      const hashPassword = await bcrypt.hash(password, 10);
      let User = new UserModel();
      User.name = req.body.name;
      User.email = req.body.email;
      User.ph_number = req.body.ph_number;
      User.password = hashPassword;
      User.confirm_password = hashPassword;

      await User.save();
    } else {
      res.send("Password not matched");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

/*User Authentication & Authorization */
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await UserModel.findOne({ email: email });

    const matchPassword = await bcrypt.compare(password, useremail.password);

    if (matchPassword === true) {
      module.exports.userAuth = true;

      res.redirect("https://my-shop-rest-api.herokuapp.com/admin");
    } else {
      res.send("Username or Password is incorrect");
    }
  } catch (error) {
    res.status(404).send("Username or Password is incorrect");
  }
});

module.exports = router;
module.exports.userAuth = false;
