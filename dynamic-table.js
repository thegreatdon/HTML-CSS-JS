function sortTable(columnIndex, direction) {
  const table = document.getElementById("myTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const isNumeric = !isNaN(rows[0].cells[columnIndex].innerText.trim());

  const dirMultiplier = direction === 'asc' ? 1 : -1;

  const sortedRows = rows.sort((a, b) => {
    const aText = a.cells[columnIndex].innerText.trim();
    const bText = b.cells[columnIndex].innerText.trim();

    const aVal = isNumeric ? parseFloat(aText) : aText.toLowerCase();
    const bVal = isNumeric ? parseFloat(bText) : bText.toLowerCase();

    if (aVal < bVal) return -1 * dirMultiplier;
    if (aVal > bVal) return 1 * dirMultiplier;
    return 0;
  });

  tbody.innerHTML = "";
  tbody.append(...sortedRows);

  // Highlight active direction
  document.querySelectorAll('.sort-controls').forEach(el => el.classList.remove('active'));
  const header = table.tHead.rows[0].cells[columnIndex];
  const arrow = header.querySelector(`.sort-controls[onclick*="${direction}"]`);
  if (arrow) arrow.classList.add('active');
}

function filterByField(query, columnIndex) {
  const table = document.getElementById("myTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const lowerQuery = query.trim().toLowerCase();

  rows.forEach(row => {
    const cellText = row.cells[columnIndex]?.innerText.trim().toLowerCase() || "";
    row.style.display = cellText.includes(lowerQuery) ? "" : "none";
  });
}



function filterAll(query) {
  const table = document.getElementById("myTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const lowerQuery = query.trim().toLowerCase();

  rows.forEach(row => {
    let matchFound = false;

    Array.from(row.cells).forEach(cell => {
      const originalText = cell.textContent;
      const lowerText = originalText.toLowerCase();

      // Remove old highlights
      cell.innerHTML = originalText;

      // Apply highlight if match found
      if (lowerQuery && lowerText.includes(lowerQuery)) {
        matchFound = true;
        const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
        cell.innerHTML = originalText.replace(regex, '<mark>$1</mark>');
      }
    });
    row.style.display = matchFound || !lowerQuery ? "" : "none";
  });
}

// Utility function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function filterByPicklist(selectedValue, columnIndex) {
  const table = document.getElementById("myTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const lowerSelected = selectedValue.trim().toLowerCase();

  rows.forEach(row => {
    const cellText = row.cells[columnIndex]?.innerText.trim().toLowerCase() || "";

    if (lowerSelected === "all") {
      row.style.display = ""; // Show all rows
    } else {
      // Show only rows with cell text exactly matching the picklist value
      row.style.display = (cellText === lowerSelected) ? "" : "none";
    }
  });
}

//function filterByBoolean(query, columnIndex) {

  
function filterByBooleanField(query, columnIndex) {
  const table = document.getElementById("myTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const normalizedQuery = query.trim().toLowerCase();

  rows.forEach(row => {
    const cellText = row.cells[columnIndex]?.innerText.trim().toLowerCase() || "";

    if (normalizedQuery === "all" || normalizedQuery === "") {
      row.style.display = "";
    } else if (normalizedQuery === "true" || normalizedQuery === "false") {
      row.style.display = (cellText === normalizedQuery) ? "" : "none";
    } else {
      row.style.display = "none";
    }
  });
}