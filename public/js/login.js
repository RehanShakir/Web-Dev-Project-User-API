$(function () {
  $(".myBtn").click(handleLogin);
});

function handleLogin() {
  const email = $("#email").val();
  console.log(email);
  const password = $("#password").val();
  console.log(password);
  $.ajax({
    url: "https://localhost:3000/api/users/login",
    method: "POST",
    data: { email, password },
    success: function (response) {
      console.log(response);
    },
  });
  // e.preventDefault();
}
