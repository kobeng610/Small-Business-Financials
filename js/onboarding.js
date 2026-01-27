// onboarding.js
// Handles first-time user onboarding (non-blocking, per-user)

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  if (!user) return; // only onboard logged-in users

  const onboardingKey = `onboarded_${user.email}`;

  if (!localStorage.getItem(onboardingKey)) {
    showOnboardingMessage();
    localStorage.setItem(onboardingKey, "true");
  }
});

// ---- UI ----

function showOnboardingMessage() {
  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.background = "#ffffff";
  container.style.border = "1px solid #ddd";
  container.style.padding = "15px";
  container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
  container.style.zIndex = "1000";
  container.style.maxWidth = "300px";

  container.innerHTML = `
    <strong>Welcome!</strong>
    <p style="margin: 8px 0;">
      Upload your transactions to instantly see income, expenses, and profit.
    </p>
    <button id="dismissOnboarding">Got it</button>
  `;

  document.body.appendChild(container);

  document
    .getElementById("dismissOnboarding")
    .addEventListener("click", () => {
      container.remove();
    });
}

// ---- HELPERS ----
// Reuse auth.js helper if present
function getCurrentUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

