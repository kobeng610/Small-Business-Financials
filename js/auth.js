// js/auth.js
const STORAGE_KEY = "sbfa_user";

function loginUser(email) {
  const user = {
    email,
    isPro: false,
    loggedInAt: Date.now()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.location.href = "dashboard.html";
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isProUser() {
  const user = getCurrentUser();
  return user && user.isPro === true;
}

function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
  }
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "login.html";
}

function upgradeToPro() {
  const user = getCurrentUser();
  if (!user) return;

  user.isPro = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

  alert("🎉 You are now a Pro user!");
  window.location.reload();
}
