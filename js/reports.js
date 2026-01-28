// js/reports.js

function getReportsKey() {
  const user = getCurrentUser();
  if (!user) return null;
  return `sbfa_reports_${user.email}`;
}

function saveReport(reportData) {
  const key = getReportsKey();
  if (!key) return;

  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  existing.unshift({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...reportData
  });

  localStorage.setItem(key, JSON.stringify(existing));
}

function getSavedReports() {
  const key = getReportsKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function clearReports() {
  const key = getReportsKey();
  if (!key) return;
  localStorage.removeItem(key);
}
function deleteReport(reportId) {
  const key = getReportsKey();
  if (!key) return;

  const reports = JSON.parse(localStorage.getItem(key) || "[]");
  const updated = reports.filter(r => String(r.id) !== String(reportId));

  localStorage.setItem(key, JSON.stringify(updated));
}
function renameReport(reportId, newName) {
  const key = getReportsKey();
  if (!key) return;

  const reports = JSON.parse(localStorage.getItem(key) || "[]");

  const report = reports.find(r => String(r.id) === String(reportId));
  if (!report) return;

  report.name = newName.trim();
  localStorage.setItem(key, JSON.stringify(reports));
}
