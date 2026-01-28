// js/auth.js

const USER_KEY = "sbfa_user";

/* ---------- Core helpers ---------- */
function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/* ---------- Auth ---------- */
function loginUser(email) {
  const user = {
    email,
    isPro: false,        // default = Free
    loggedInAt: Date.now()
  };
  setUser(user);
  window.location.href = "dashboard.html";
}

function logoutUser() {
  localStorage.removeItem(USER_KEY);
  window.location.href = "login.html";
}

function requireAuth() {
  const user = getUser();
  if (!user) {
    window.location.href = "login.html";
  }
}

/* ---------- Pro / Feature gating ---------- */
function isProUser() {
  const user = getUser();
  return !!(user && user.isPro === true);
}

/* ---------- TEMP DEV UPGRADE (for testing) ---------- */
function upgradeToPro() {
  const user = getUser();
  if (!user) return;

  user.isPro = true;
  setUser(user);
  alert("🎉 You are now a Pro user!");
  location.reload();
}
