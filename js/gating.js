// gating.js
// Handles access control and feature gating for free vs paid users

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();

  // 🚫 Not logged in → kick out
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // 💳 Free user → gate paid features
  if (!user.isPaid) {
    enableUpgradeMode();
  } else {
    hideUpgradeMode();
  }
});

// ---- CORE FUNCTIONS ----

function enableUpgradeMode() {
  const upgradeBtn = document.getElementById("upgradeBtn");
  if (upgradeBtn) {
    upgradeBtn.style.display = "inline-block";
  }

  // Future: disable save/export buttons here
  // Example:
  // document.querySelectorAll(".paid-feature").forEach(el => el.disabled = true);
}

function hideUpgradeMode() {
  const upgradeBtn = document.getElementById("upgradeBtn");
  if (upgradeBtn) {
    upgradeBtn.style.display = "none";
  }
}

// ---- HELPERS ----

function getCurrentUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    // Corrupted user data → force logout
    localStorage.removeItem("user");
    return null;
  }
}
