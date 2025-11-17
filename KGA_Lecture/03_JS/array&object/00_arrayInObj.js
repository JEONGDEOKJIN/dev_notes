var student = {
  name: "김민수",
  grade: 3,
  score: [30, 90, 88],
};

console.log(student.name);

// 평균 = 총합 / 개수

var totalScore = 0;
for (var i = 0; i < student.score.length; i++) {
  // 2번째
  totalScore = totalScore + student.score[i];
}
var average = totalScore / student.score.length;
console.log(average);
