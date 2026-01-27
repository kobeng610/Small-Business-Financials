// dashboard.js
// Handles CSV upload, parsing, categorization, and report rendering

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput) return;

  fileInput.addEventListener("change", handleFile);
});

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => processCSV(e.target.result);
  reader.readAsText(file);
}

function processCSV(csv) {
  const rows = csv.split("\n").slice(1); // skip header row

  let totalIncome = 0;
  let totalExpenses = 0;

  const incomeRows = [];
  const expenseRows = [];

  rows.forEach(row => {
    if (!row.trim()) return;

    const [date, description, amountStr] = row.split(",");
    const amount = parseFloat(amountStr);

    if (!date || !description || isNaN(amount)) return;

    if (amount > 0) {
      totalIncome += amount;
      incomeRows.push({
        date,
        description,
        amount
      });
    } else {
      totalExpenses += Math.abs(amount);
      expenseRows.push({
        date,
        description,
        category: categorize(description),
        amount: Math.abs(amount)
      });
    }
  });

  renderSummary(totalIncome, totalExpenses);
  renderTables(incomeRows, expenseRows);
}

function renderSummary(income, expenses) {
  const summary = document.getElementById("summary");
  if (!summary) return;

  const netProfit = income - expenses;

  summary.innerHTML = `
    <div class="summary">
      <div class="card">
        <h3>Total Income</h3>
        <p class="positive">$${income.toFixed(2)}</p>
      </div>

      <div class="card">
        <h3>Total Expenses</h3>
        <p class="negative">$${expenses.toFixed(2)}</p>
      </div>

      <div class="card">
        <h3>Net Profit</h3>
        <p>$${netProfit.toFixed(2)}</p>
      </div>
    </div>
  `;
}

function renderTables(incomeRows, expenseRows) {
  const incomeTable = document.getElementById("incomeTable");
  const expenseTable = document.getElementById("expenseTable");

  if (incomeTable) incomeTable.innerHTML = "";
  if (expenseTable) expenseTable.innerHTML = "";

  incomeRows.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.date}</td>
      <td>${row.description}</td>
      <td class="positive">$${row.amount.toFixed(2)}</td>
    `;
    incomeTable.appendChild(tr);
  });

  expenseRows.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.date}</td>
      <td>${row.description}</td>
      <td>${row.category}</td>
      <td class="negative">$${row.amount.toFixed(2)}</td>
    `;
    expenseTable.appendChild(tr);
  });
}

function categorize(description) {
  const desc = description.toLowerCase();

  if (desc.includes("rent")) return "Rent";
  if (desc.includes("payroll") || desc.includes("salary")) return "Payroll";
  if (desc.includes("electric") || desc.includes("water") || desc.includes("internet")) return "Utilities";
  if (desc.includes("google") || desc.includes("facebook") || desc.includes("ads")) return "Marketing";
  if (desc.includes("uber") || desc.includes("flight") || desc.includes("hotel")) return "Travel";
  if (desc.includes("office")) return "Office Supplies";

  return "Miscellaneous";
}

