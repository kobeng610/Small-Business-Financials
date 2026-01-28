// js/auth.js

const STORAGE_KEY = "sbfa_user";

/* ======================
   AUTH HELPERS
====================== */

function loginUser(email) {
  if (!email) {
    alert("Email is required");
    return;
  }

  const user = {
    email: email,
    isPro: false,          // default Free plan
    loggedInAt: Date.now()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

  // ✅ redirect after login
  window.location.href = "dashboard.html";
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "login.html";
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
  }
}

function isProUser() {
  const user = getCurrentUser();
  return user && user.isPro === true;
}

function upgradeToPro() {
  const user = getCurrentUser();
  if (!user) return;

  user.isPro = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

