// js/auth.js

const AUTH_KEY = "sbfa_user";

// LOGIN
function loginUser(email) {
  const user = {
    email: email,
    isPro: false,          // default = Free
    loggedInAt: Date.now()
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
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

// CHECK PRO STATUS
function isProUser() {
  const user = getCurrentUser();
  return user && user.isPro === true;
}

// AUTH GUARD
function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
  }
}
