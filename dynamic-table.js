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