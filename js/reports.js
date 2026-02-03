// js/reports.js

// ======================
// STORAGE KEY (PER USER)
// ======================
function getReportsKey() {
  const user = getCurrentUser();
  if (!user || !user.email) return null;
  return `sbfa_reports_${user.email}`;
}

// ======================
// GET ALL REPORTS
// ======================
function getSavedReports() {
  const key = getReportsKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// ======================
// SAVE REPORT
// ======================
function saveReport(reportData) {
  const key = getReportsKey();
  if (!key) return;

  const reports = getSavedReports();

  const record = {
    id: Date.now(),
    name: reportData.name || `Report ${reports.length + 1}`,
    createdAt: new Date().toISOString(),
    rows: reportData.rows || [],
    totals: reportData.totals || {}
  };

  reports.unshift(record);
  localStorage.setItem(key, JSON.stringify(reports));

  console.log("✅ Report saved:", record);
}

// ======================
// DELETE REPORT
// ======================
function deleteReport(reportId) {
  const key = getReportsKey();
  if (!key) return;

  const reports = getSavedReports().filter(
    r => String(r.id) !== String(reportId)
  );

  localStorage.setItem(key, JSON.stringify(reports));
}

// ======================
// RENAME REPORT
// ======================
function renameReport(reportId, newName) {
  const key = getReportsKey();
  if (!key) return;

  const reports = getSavedReports().map(r => {
    if (String(r.id) === String(reportId)) {
      return { ...r, name: newName };
    }
    return r;
  });

  localStorage.setItem(key, JSON.stringify(reports));
}

