const Order = require("../../../models/order");

function orderController() {
  return {
    index(req, res) {
      Order.find({ status: { $ne: "completed" } }, null, {
        sort: { createdAt: -1 },
      })
        .populate("customerId", "-password")
        .exec((err, orders) => {
          if (req.xhr) {
            return res.json(orders);
          } else {
            console.log(orders._id);
            return res.render("admin-orders", { orders: orders });
          }
        });
    },
  };
}

module.exports = orderController;
