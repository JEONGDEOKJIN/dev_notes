
# 기본 

## 숫자 비교 
```js
const numbers = [10, 5, 3, 8, 2];

// Ascending order (smallest to largest)
const ascending = numbers.sort((first, second) => first - second);
console.log("Ascending:", ascending); // Output: [2, 3, 5, 8, 10]

/*
    1. 배열에서, '첫번째 인자'와 '두번째 인자' 를 가져와서 sort 메서드에 넣는다. 
    2. 들어온 인자에 대해서 '빼기 연산' 을 한다. ('first - second' 안에 들어있는 내용)
    3. 값이 큰지, 작은지, 같은지를 안다. ('first - second' 안에 들어있는 내용)
    4. 내가 지정한 순서인 'first - second' 대로 나열한다. ('first - second' 안에 들어있는 내용)
*/

// Descending order (largest to smallest)
const descending = numbers.sort((first, second) => second - first);
console.log("Descending:", descending); // Output: [10, 8, 5, 3, 2]
/*
    1. 배열에서, '첫번째 인자'와 '두번째 인자' 를 가져와서 sort 메서드에 넣는다. 
    2. 들어온 인자에 대해서 '빼기 연산' 을 한다. ('second-first' 안에 들어있는 내용)
    3. 값이 큰지, 작은지, 같은지를 안다. ('second-first' 안에 들어있는 내용)
    4. 내가 지정한 순서인 'second-first' 대로 나열한다. ('second-first' 안에 들어있는 내용)
*/
```


## 문자 정렬 

### 기본 설명

```bash
1. 기본 정렬: words.sort()는 유니코드 순서로 동작.
2. localeCompare: 한국어 데이터에 대해 정확한 가나다 순 정렬이 가능.
3. 혼합 데이터: 타입에 따라 조건부로 정렬 가능.
```


### 한국어 정렬 예시

```js
// 한글 정렬
    const koreanWords = ["사과", "바나나", "체리", "감"];

    const localeSort = koreanWords.sort((a, b) => a.localeCompare(b, "ko"));
    console.log("한국어 기준 정렬:", localeSort);
    // 출력: ["감", "바나나", "사과", "체리"]


// 혼합 정렬 
    const mixedData = ["나무", 10, "감자", 3, "바다"];

    const sortedMixed = mixedData.sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") return a - b; // 숫자는 오름차순
    if (typeof a === "string" && typeof b === "string") return a.localeCompare(b, "ko"); // 문자열은 한국어 순서
    return typeof a === "number" ? -1 : 1; // 숫자를 문자열보다 앞에 배치
    });

    console.log("혼합 데이터 정렬:", sortedMixed);
    // 출력: [3, 10, "감자", "나무", "바다"]
```



# 관련 키워드 

## compareFunction 
- compareFunction이 제공되지 않으면 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬됩니다. (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 클로저 
- sort 메소드는 함수식 (및 클로저)와 함께 편리하게 사용할 수 있습니다. (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function (a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
```