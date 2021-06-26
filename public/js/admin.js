$(function () {
  console.log("in inti");

  const orderTableBody = document.querySelector("#orderTableBody");

  initAdmin(orderTableBody);
});

function initAdmin(orderTableBody) {
  let orders = [];
  console.log("in inti");
  let markup;

  $.ajax({
    url: "/admin-orders",
    method: "GET",
    headers: { "X-Requested-With": "XMLHttpRequest" },
    success: function (res) {
      console.log("success");

      console.log(orders);

      orders = res.data;
      console.log(orders);
      markup = generateMarkup(orders);
      orderTableBody.innerHTML = markup;
    },
  });
  function renderItems(items) {
    let prasedItems = Object.value(items);
    return prasedItems
      .map((product) => {
        return `<p>${product.item.name} - ${product.qty} pcs</p>`;
      })
      .join("");
  }
  function generateMarkup(orders) {
    console.log("Generating");
    return orders
      .map((order) => {
        return `<tr>
                  <td>${order._id}
                    <div>${renderItems(orders.items)}</div>
                  </td>
                  <td>${order.customerId.name}</td>
                  <td>${order.address}</td>
                <td>
                  <form action="/admin/orders/status" method="post">
                      <input type="hidden" name="orderId" value="${order._id}">
                        <select name="status" onchange="this.form.submit()">
                            <option value="order-placed"
                            ${
                              order.status === "order-placed" ? "selected" : ""
                            }>Placed
                            </option>
                            <option value="confirmed"
                            ${
                              order.status === "confirmed" ? "selected" : ""
                            }>Placed
                            </option>
                            <option value="delivered"
                            ${
                              order.status === "delivered" ? "selected" : ""
                            }>Placed
                            </option>
                        </select>
                  </form>
                  </td>
                  <td>${order.createdAt}</td>
        </tr>`;
      })
      .join("");
  }
}
