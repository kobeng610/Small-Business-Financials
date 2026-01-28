const USER_KEY = "sbfa_user";

/* -----------------------------
   LOGIN
--------------------------------*/
function loginUser(email) {
  const user = {
    email,
    isPro: false,
    loggedInAt: Date.now()
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.location.href = "dashboard.html";
}

/* -----------------------------
   AUTH GUARD
--------------------------------*/
function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
  }
}

/* -----------------------------
   CURRENT USER
--------------------------------*/
function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* -----------------------------
   PRO CHECK
--------------------------------*/
function isProUser() {
  const user = getCurrentUser();
  return user && user.isPro === true;
}

/* -----------------------------
   LOGOUT
--------------------------------*/
function logoutUser() {
  localStorage.removeItem(USER_KEY);
  window.location.href = "login.html";
}
/* -----------------------------
   UPGRADE TO PRO
--------------------------------*/
function upgradeToPro() {
  const user = getCurrentUser();
  if (!user) {
    alert("Session expired. Please log in again.");
    window.location.href = "login.html";
    return;
  }

  user.isPro = true;
  localStorage.setItem("sbfa_user", JSON.stringify(user));

  alert("🎉 You are now a Pro user!");
}
