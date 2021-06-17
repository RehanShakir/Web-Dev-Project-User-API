const auth = require("../../routes/api/users");

function authController() {
  return {
    login(req, res) {
      // console.log(auth.userAuth);
      // if (auth.userAuth === false) {
      //   res.redirect("/login");
      // } else if (auth.userAuth === true) {
      //   res.render("admin");
      // }
      res.render("admin");
    },
  };
}

module.exports = authController;
