// 1단계 : 일반 배열로 구하기 (#하드코딩)
var myFruits = {
  myArray: ["사과", "바나나", "오렌지", "오렌지", "오렌지"],
  length: function () {
    console.log("5개 입니다.");
  },
};
myFruits.length();

// 👉 이렇게 하면, myFruits 개체에 대해서 길이 계산을 할 때 사용하기 편해질 것 같네요.

// -----------------------------------------
// 2단계 : 동적으로 대응하게 하기 : 함수 만들기
var myFruits = {
  myArray: ["사과", "바나나", "오렌지", "오렌지-2", "오렌지-3"],
  lengthCustom: function () {
    var count = 0;

    for (var i = 0; i < 5; i++) {
      if (myFruits.myArray[i] !== undefined) {
        count++;
      }
    }

    return count;
  },
};

// 배열 메서드와 비교하기
console.log("내장 속성", myFruits.myArray.length);
console.log("커스텀메서드", myFruits.lengthCustom());

// -----------------------------------
// 3단계 : 동적으로 대응하게 하기 : .length 적용하기
var myFruits = {
  myArray: ["사과", "바나나", "오렌지", "오렌지-2", "오렌지-3"],
  lengthCustom: function () {
    var count = 0;

    for (var i = 0; i < myFruits.myArray.length; i++) {
      if (myFruits.myArray[i] !== undefined) {
        count++;
      }
    }

    return count;
  },
};

// 2단계 : 배열 메서드와 비교하기
console.log("내장 속성", myFruits.myArray.length);
console.log("커스텀메서드", myFruits.lengthCustom());
