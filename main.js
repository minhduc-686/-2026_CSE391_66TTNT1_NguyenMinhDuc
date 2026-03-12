const txtName = document.getElementById("txtName");
const txtScore = document.getElementById("txtScore");
const btnAdd = document.getElementById("btnAdd");
const searchName = document.getElementById("searchName");
const filterGrade = document.getElementById("filterGrade");
const studentBody = document.getElementById("studentBody");
const totalStd = document.getElementById("totalStd");
const avgScore = document.getElementById("avgScore");

let students = [];
function getRank(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
}
function renderTable() {
  studentBody.innerHTML = "";
  let count = 0;
  let sum = 0;
  const keyword = searchName.value.toLowerCase();
  const filterValue = filterGrade.value;
  for (let i = 0; i < students.length; i++) {
    const sv = students[i];
    const rank = getRank(sv.score);
    const matchSearch = sv.name.toLowerCase().indexOf(keyword) !== -1;
    const matchFilter = filterValue === "All" || rank === filterValue;
    if (matchSearch && matchFilter) {
      count++;
      sum += sv.score;
      const tr = document.createElement("tr");
      if (sv.score < 5) {
        tr.style.backgroundColor = "yellow";
      }
      let html = "<td>" + count + "</td>";
      html += "<td>" + sv.name + "</td>";
      html += "<td>" + sv.score + "</td>";
      html += "<td>" + rank + "</td>";
      html +=
        "<td><button onclick='deleteStudent(" + i + ")'>Xóa</button></td>";
      tr.innerHTML = html;
      studentBody.appendChild(tr);
    }
  }
  totalStd.innerText = count;
  if (count > 0) {
    avgScore.innerText = (sum / count).toFixed(2);
  } else {
    avgScore.innerText = "0";
  }
}
btnAdd.onclick = function () {
  const name = txtName.value.trim();
  const score = parseFloat(txtScore.value);
  if (name === "" || isNaN(score) || score < 0 || score > 10) {
    alert("Vui lòng nhập họ tên và điểm từ 0 đến 10!");
    return;
  }
  students.push({
    name: name,
    score: score,
  });
  renderTable();
  txtName.value = "";
  txtScore.value = "";
  txtName.focus();
};
window.deleteStudent = function (index) {
  students.splice(index, 1);
  renderTable();
};
searchName.oninput = renderTable;
filterGrade.onchange = renderTable;
txtScore.onkeyup = function (e) {
  if (e.keyCode === 13) {
    btnAdd.onclick();
  }
};
