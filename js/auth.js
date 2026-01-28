// js/auth.js

const AUTH_KEY = "sbfa_user";

// LOGIN
function loginUser(email) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({
      email: email,
      loggedInAt: Date.now()
    })
  );

  window.location.href = "dashboard.html";
}

// LOGOUT
function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "index.html";
}

// GET CURRENT USER
function getCurrentUser() {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
}

// AUTH GUARD (protect pages)
function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
  }
}
