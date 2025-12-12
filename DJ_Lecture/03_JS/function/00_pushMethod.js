// 1. push 를 js 로 구현해보기
var testOBJ = {
  arr: ["hello", "good"],

  pushCustom: function (value) {
    testOBJ.arr[testOBJ.arr.length] = value;
  },
};

testOBJ.pushCustom("working");

console.log(testOBJ.arr);

// 2. 내장 메서드 사용하기
var testArr = ["hello_", "good_"];
testArr.push("working_");
console.log(testArr); // ["hello", "good", "working"]
