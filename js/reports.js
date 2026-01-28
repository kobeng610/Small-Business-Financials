// js/reports.js

function getReportsKey() {
  const user = getCurrentUser();
  if (!user || !user.email) return null;
  return `sbfa_reports_${user.email}`;
}

function saveReport(reportData) {
  const key = getReportsKey();
  if (!key) return;

  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  const record = {
    id: Date.now(),
    name: reportData.name || `Report ${existing.length + 1}`,
    createdAt: new Date().toISOString(),
    rows: reportData.rows,
    totals: reportData.totals
  };

  existing.unshift(record);
  localStorage.setItem(key, JSON.stringify(existing));

  console.log("✅ Report saved:", record);
}

function getSavedReports() {
  const key = getReportsKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function deleteReport(reportId) {
  const key = getReportsKey();
  if (!key) return;

  const filtered = getSavedReports().filter(r => r.id !== Number(reportId));
  localStorage.setItem(key, JSON.stringify(filtered));
}

function renameReport(reportId, newName) {
  const key = getReportsKey();
  if (!key) return;

  const reports = getSavedReports();
  const report = reports.find(r => r.id === Number(reportId));
  if (!report) return;

  report.name = newName;
  localStorage.setItem(key, JSON.stringify(reports));
}
