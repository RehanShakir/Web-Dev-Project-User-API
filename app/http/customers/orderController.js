const Order = require("../../../models/order");
function orderController() {
  return {
    order(req, res) {
      //validate request
      const { ph_number, address, paymentType } = req.body;
      if (!ph_number || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }
      const order = new Order();
      order.customer_id = req.user._id;
      order.ph_number = ph_number;
      order.address = address;
      order.items = req.session.cart.items;
      order.paymentType = paymentType;

      order
        .save()
        .then((result) => {
          req.flash("success", "Order Placed Successfully");
          delete req.session.cart;
          return res.redirect("/customers-orders");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customer_id: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.render("customers-orders", { orders: orders });
    },
  };
}

module.exports = orderController;
