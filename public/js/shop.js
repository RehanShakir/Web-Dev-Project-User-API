$(function () {
  console.log("SHOP");
  loadProducts();
});

function loadProducts() {
  $.ajax({
    url: "https://my-shop-rest-api.herokuapp.com/api/products/",
    method: "GET",
    success: function (response) {
      $(".allProducts").empty();

      for (let i = 0; i < response.length; i++) {
        product = response[i];
        $(".allProducts").prepend(`
          <div class="col-md-3" _id=${product._id}>
              <div class="card p-3">
                <div class="text-center">
                  <img src="${product.productImage}" width="200" />
                </div>
                <div class="product-details">
                  <span class="font-weight-bold d-block">Rs. ${product.price}</span>
                  <span>${product.name}</span>
                  <div class="buttons d-flex flex-row">
                    <div class="cart"><i class="fa fa-shopping-cart"></i></div>
                    <button class="btn btn-success cart-button btn-block">
                      <span class="dot">1</span><a href="/cart">Add to cart</a>
                    </button>
                  </div>
                  <div class="weight"><small>Stock: ${product.stock}</small></div>
                </div>
              </div>
            </div>
          `);
      }
    },
  });
}
