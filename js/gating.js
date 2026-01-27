const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

if (!user.isPaid) {
  disablePaidFeatures();
}

function disablePaidFeatures() {
  document.getElementById("upgradeBtn").style.display = "block";
}
