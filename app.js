const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");

//Routers
const usersRouter = require("./routes/api/users");
const productsRouter = require("./routes/api/products");

const app = express();
require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.use("/productImage", express.static("assets/images"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
