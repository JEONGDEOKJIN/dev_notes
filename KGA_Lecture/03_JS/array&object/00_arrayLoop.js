var exerciseMinute = [20, 10, 30, 50, 10, 1,2];
var days = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];

// 이건 템플릿 리터럴을 아직 안 배워서 안 됨
for (var i = 0; i < days.length; i++) {
  console.log(`${days[i]} : ${exerciseMinute[i]} 분`);
}

var totalMinute = 0;
for (var m = 0; m < exerciseMinute.length; m++) {
  totalMinute = totalMinute + exerciseMinute[m];
}
console.log(`총 운동시간 ${totalMinute}`);
