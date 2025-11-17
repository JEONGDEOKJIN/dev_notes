// var original = 100;
// var copy = original

// copy = 'hello'

// console.log(original)
// console.log(copy)

// // 각각 어떤 값이 나올까요?

// var originArr = [1,2,3]
// var copyArr;
// copyArr = originArr

// copyArr[2] = "hello"

// console.log(originArr) // ?
// console.log(copyArr) // ?

// var student1 = { name: "김철수", score: 85 };
// var student2 = student1;

// student2.score = 100;

// console.log(student1.score); // 100
// console.log(student2.score); // 100

// -------------------
// var arr1 = [1, 2, 3];
// var arr2 = arr1;
// var arr3 = [1, 2, 3];  // 새로 만듦

// arr2[0] = 999;

// console.log(arr1[0]);  // 999
// console.log(arr2[0]);  // 999
// console.log(arr3[0]);  // 1

// --------------------
var students = [
  { name: "김철수", score: 70 },
  { name: "이영희", score: 60 },
  { name: "최태욱", score: 89 },
];

for (var i = 0; i < students.length; i++) {
  if (students[i].score >= 80) {
    students[i].score = students[i].score + 2;
  }
}

console.log(students);
