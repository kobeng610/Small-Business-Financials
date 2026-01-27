// auth.js
function loginUser(email) {
  localStorage.setItem("user", JSON.stringify({
    email,
    isPaid: false
  }));
  window.location.href = "dashboard.html";
}
