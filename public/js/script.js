$(function () {
  const addToCart = document.querySelectorAll(".cart-button");
  const alertMsg = document.querySelector(".alert");
  $(".delBtn").click(removeProduct);
  $(".updateBtn").click(openProductModal);
  $(".modalBtnUpdate").click(updateProduct);

  removeAlert(alertMsg);
  cart(addToCart);
});

function updateCart(product) {
  let cartCounter = document.querySelector(".cartCounter");

  _id = product._id;
  name = product.name;
  price = product.price;
  category = product.category;
  tags = product.tags;
  stock = product.stock;
  productImage = product.productImage;

  $.ajax({
    url: "/update-cart",
    method: "POST",
    data: {
      _id,
      name,
      price,
      category,
      tags,
      stock,
      productImage,
    },
    success: function (res) {
      cartCounter.innerText = res.totalQty;
      new AWN().success("Item Added To Cart", {
        durations: { success: 2000 },
      });
    },
  });
}

function cart(addToCart) {
  addToCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let product = JSON.parse(btn.dataset.product);
      updateCart(product);
    });
  });
}
// function reloadProductsDiv() {
//   $(".wrapper").load(location.href + " .wrapper");
//   return;
// }
//removing alert after
function removeAlert(alertMsg) {
  if (alertMsg) {
    setTimeout(() => {
      alertMsg.remove();
    }, 2000);
  }
}
function removeProduct() {
  let btn = $(this);
  let parrentDiv = btn.closest(".myProd");
  let id = parrentDiv.attr("product_id");

  console.log(id);
  console.log("rem");
  $.ajax({
    url: "/api/products/" + id,
    method: "DELETE",
    success: function () {
      location.reload(true);
      console.log("Item deleted");
    },
  });
}
function openProductModal() {
  let btn = $(this);
  let parrentDiv = btn.closest(".myProd");
  let id = parrentDiv.attr("product_id");
  $.ajax({
    url: "/api/products/" + id,
    method: "GET",
    success: function (res) {
      $("#editProductModal").val(res._id);
      $("#title").val(res.name);
      $("#price").val(res.price);
      $("#category").val(res.category);
      $("#tags").val(res.tags);
      $("#stock").val(res.stock);
      $("#editProductModal").modal("show");
    },
  });
}

function updateProduct() {
  const id = $("#editProductModal").val();
  const name = $("#title").val();
  const price = $("#price").val();
  const category = $("#category").val();
  const tags = $("#tags").val();
  const stock = $("#stock").val();

  $.ajax({
    url: "/api/products/" + id,
    method: "PUT",
    data: { name, price, category, tags, stock },
    success: function () {
      console.log("Product Updated");
    },
  });
}
