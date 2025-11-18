// 목표: 배열에 특정 값이 있는지 확인하는 함수 만들기

var myArray = {
  items: [10, 20, 30, 40],

  // TODO: customIncludes 메서드를 만드세요
  // - 매개변수: value (찾을 값)
  // - 반환값: true 또는 false
  // 힌트: for문으로 myArray.items 순회하며 값 비교
  customIncludes: function (value) {
    console.log("value", value);
    for (var i = 0; i < myArray.items.length; i++) {
      if (myArray.items[i] === value) {
        return true;
      }
    }
    return false;
  },
};

console.log(myArray.customIncludes(20)); // 예상: true
console.log(myArray.customIncludes(99)); // 예상: false
