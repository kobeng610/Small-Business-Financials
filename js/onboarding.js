if (!localStorage.getItem("onboarded")) {
  alert("Upload your transactions to see your business numbers instantly.");
  localStorage.setItem("onboarded", "true");
}
