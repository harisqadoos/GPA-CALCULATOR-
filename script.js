document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('gpa-form');
  const subjectsDiv = document.getElementById('subjects');
  const addBtn = document.getElementById('add-subject');
  const resultDiv = document.getElementById('result');

  function addSubjectRow() {
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML = `
      <input type="text" placeholder="Subject" required>
      <input type="number" placeholder="Credit Hours" min="1" required>
      <input type="number" placeholder="Marks (0-100)" min="0" max="100" required>
      <button type="button" onclick="this.parentNode.remove()">❌</button>
    `;
    subjectsDiv.appendChild(row);
  }

  // Marks to Grade Point Converter
  function convertToGPA(marks) {
    if (marks >= 85) return 4.0;
    if (marks >= 75) return 3.5;
    if (marks >= 65) return 3.0;
    if (marks >= 55) return 2.5;
    if (marks >= 45) return 2.0;
    if (marks >= 40) return 1.0;
    return 0.0;
  }

  addBtn.addEventListener('click', addSubjectRow);
  addSubjectRow();

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let totalCredits = 0;
    let totalPoints = 0;

    document.querySelectorAll('.subject-row').forEach(function (row) {
      const credit = parseFloat(row.children[1].value);
      const marks = parseFloat(row.children[2].value);
      const gradePoint = convertToGPA(marks);

      totalCredits += credit;
      totalPoints += credit * gradePoint;
    });

    const gpa = totalPoints / totalCredits;
    resultDiv.textContent = 'Your GPA is: ' + (isNaN(gpa) ? '0.00' : gpa.toFixed(2));
  });
});