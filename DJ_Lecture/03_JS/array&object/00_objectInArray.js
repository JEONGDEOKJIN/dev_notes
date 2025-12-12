var students = [
  { name: "덕진", score: 30 },
  { name: "진수", score: 20 },
  { name: "수령", score: 50 },
];

for (var i = 0; i < students.length; i++) {
  console.log(students[i]["name"]);
}

var totalScore = 0;
for (var i = 0; i < students.length; i++) {
  totalScore = totalScore + students[i]["score"];
  if (students[i]["score"] > 30) {
    console.log(students[i]["score"]);
  }
}

var average = totalScore / students.length;

console.log("average", average);
