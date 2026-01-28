// ===============================
// AUTH + USER STATE (SINGLE SOURCE)
// ===============================

const STORAGE_KEY = "sbfa_user";

// Get current user
function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Login user
function loginUser(email) {
  if (!email) return;

  const user = {
    email,
    isPro: false,
    loggedInAt: Date.now()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.location.href = "dashboard.html";
}

// Logout user
function logoutUser() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "login.html";
}

// Require authentication
function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
  }
}

// Pro check (🔥 THIS IS THE ONLY PLACE 🔥)
function isProUser() {
  const user = getCurrentUser();
  return !!(user && user.isPro === true);
}

// Upgrade user to Pro
function upgradeToPro() {
  const user = getCurrentUser();
  if (!user) {
    alert("Please log in again.");
    return;
  }

  user.isPro = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

  alert("🎉 You are now a Pro user!");
  window.location.reload();
}
