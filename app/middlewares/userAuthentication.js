const User = require("../../models/user");
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  return next();
}
function userAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

const authentication = {
  checkAuthenticated,
  checkNotAuthenticated,
  userAuth,
};
module.exports = authentication;
