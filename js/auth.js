// auth.js
// Lightweight client-side auth (MVP)
// Can be replaced with Firebase Auth later

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // If user is already logged in, keep them out of login page
  if (loginForm && isLoggedIn()) {
    window.location.href = "dashboard.html";
    return;
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Attach logout handler if button exists
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }
});

// ---- CORE AUTH FUNCTIONS ----

function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  // MVP login: accept any credentials
  loginUser(email);
}

function loginUser(email) {
  const user = {
    email: email,
    isPaid: false,      // default for now
    loggedInAt: Date.now()
  };

  localStorage.setItem("user", JSON.stringify({
  email: "test@demo.com",
  isPaid: false
}));

  window.location.href = "dashboard.html";
}

function logoutUser() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ---- HELPERS ----

function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
  return !!getCurrentUser();
}
