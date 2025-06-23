let courseCount = 1;
const gradePoints = {
  'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00,
  'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'C-': 1.67,
  'D+': 1.33, 'D': 1.00, 'F': 0.00
};

function addCourse() {
  courseCount++;
  const container = document.getElementById('coursesContainer');
  const row = document.createElement('div');
  row.className = 'course-row';
  row.innerHTML = `
    <input type="text" placeholder="Course-${courseCount}" disabled>
    <select class="credit">
      <option value="">Credits</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <select class="grade">
      <option value="">Grade</option>
      <option value="A">A</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B">B</option>
      <option value="B-">B-</option>
      <option value="C+">C+</option>
      <option value="C">C</option>
      <option value="C-">C-</option>
      <option value="D+">D+</option>
      <option value="D">D</option>
      <option value="F">F</option>
    </select>
    <button onclick="this.parentElement.remove()">DELETE</button>
  `;
  container.appendChild(row);
}

function resetAll() {
  document.getElementById('completedCredits').value = '';
  document.getElementById('currentCGPA').value = '';
  document.getElementById('coursesContainer').innerHTML = '';
  courseCount = 0;
  addCourse();
}

function calculateCGPA() {
  const completedCredits = parseFloat(document.getElementById('completedCredits').value);
  const currentCGPA = parseFloat(document.getElementById('currentCGPA').value);

  const creditsInputs = document.querySelectorAll('.credit');
  const gradesInputs = document.querySelectorAll('.grade');

  let totalCredit = 0;
  let totalGradePoint = 0;

  for (let i = 0; i < creditsInputs.length; i++) {
    const credit = parseFloat(creditsInputs[i].value);
    const grade = gradesInputs[i].value.toUpperCase();

    if (!credit || !gradePoints.hasOwnProperty(grade)) {
      alert(`Please enter valid credit and grade for Course-${i + 1}`);
      return;
    }

    totalCredit += credit;
    totalGradePoint += credit * gradePoints[grade];
  }

  const totalEarnedCredit = completedCredits + totalCredit;
  const totalEarnedPoint = (completedCredits * currentCGPA) + totalGradePoint;
  const newCGPA = totalEarnedPoint / totalEarnedCredit;

  alert(`Your updated CGPA is: ${newCGPA.toFixed(2)}`);
}

// Add default course row
window.onload = () => {
  addCourse();
};
