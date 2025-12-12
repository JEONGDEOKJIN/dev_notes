## JavaScript Object 학습 가이드

**출처**: [MDN - JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics)

---

### 객체 만들기

```jsx
var 객체이름 = {
  속성명1: 값1,
  속성명2: 값2,
  메서드명: function() { ... }
};
```

- 위를 보면:
    - `{ }`
        - 객체 선언에 사용하는 기호(심볼)
    - `속성명: 값`
        - 이름-값 쌍으로 구성
        - 콤마(`,`)로 구분
        - 콜론(`:`)으로 이름과 값을 연결
    - 값으로 다양한 `데이터 타입` 가능
        - 문자열, 숫자, 배열, 객체, 함수 등

- [실습] 다양한 데이터 타입 넣어보기
    
    ```jsx
    // 사람 정보를 담은 객체
    const person = {
      name: "김철수",              // 문자열
      age: 25,                     // 숫자
      hobbies: ["독서", "운동"],   // 배열
      address: {                   // 객체 (중첩)
        city: "서울",
        zipcode: "12345"
      },
      isStudent: false,            // 불리언
      greet: function() {          // 함수 (메서드)
        console.log("안녕하세요!");
      }
    };
    
    console.log(person.name);      // "김철수"
    console.log(person.age);       // 25
    console.log(person.hobbies);   // ["독서", "운동"]
    console.log(person.address);   // { city: "서울", zipcode: "12345" }
    person.greet();                // "안녕하세요!"
    ```

---

### 객체 값 접근 및 수정

- 내가 원하는 속성의 값을 가져오려면?
    
    ```jsx
    객체는 값을 어떻게 관리할까?
    
    객체는
      1) 속성 이름 (key)
      2) 속성 값 (value)
    를 쌍으로 기억한다.
    
    배열과 다른 점:
       - 배열: 숫자 인덱스로 접근 (0, 1, 2...)
       - 객체: 이름으로 접근 ("name", "age", "city"...)
       
    var person = { name: "김철수", age: 25 };
       'name' 이라는 속성명으로 "김철수" 값에 접근
       'age' 라는 속성명으로 25 값에 접근
    
    두 가지 방법으로 접근 가능:
    
    // 1. Dot notation (점 표기법) - 더 간단하고 읽기 쉬움
    console.log(person.name);  // "김철수"
    
    // 2. Bracket notation (괄호 표기법) - 동적 접근 가능
    console.log(person["age"]); // 25
    
    // 수정
    person.age = 26;
    person["name"] = "이영희";
    ```

- 접근 및 수정 문법 정리

```jsx
// 객체 생성
var 객체이름 = { 속성명1: 값1, 속성명2: 값2 };

// 값 접근
객체이름.속성명           // Dot notation (권장)
객체이름["속성명"]        // Bracket notation

// 값 수정
객체이름.속성명 = "새로운 값"
객체이름["속성명"] = "새로운 값"

// 새 속성 추가
객체이름.새속성 = "값"
```

---

### 실습 문제

- [Q1] 기본 객체 생성 및 접근
    
    ```jsx
    // 자동차 정보 객체
    var car = {
      brand: "Hyundai",
      model: "Sonata",
      year: 2023,
      color: "white"
    };
    
    // TODO 1: brand 값 출력하기
    // 여기에 코드 작성
    
    // TODO 2: color를 "black"으로 변경하기
    // 여기에 코드 작성
    
    // TODO 3: 새 속성 price를 3000으로 추가하기
    // 여기에 코드 작성
    
    console.log(car);
    ```
    
    - 예상 답변
        
        ```jsx
        var car = {
          brand: "Hyundai",
          model: "Sonata",
          year: 2023,
          color: "white"
        };
        
        // brand 출력
        console.log(car.brand);  // "Hyundai"
        
        // color 변경
        car.color = "black";
        
        // price 추가
        car.price = 3000;
        
        console.log(car);
        // { brand: "Hyundai", model: "Sonata", year: 2023, color: "black", price: 3000 }
        ```
        

- [Q2] 중첩된 객체 다루기
    - 문제
        
        ```jsx
        // 학생 정보 객체 (주소 정보가 중첩됨)
        var student = {
          name: "박지민",
          grade: 3,
          address: {
            city: "부산",
            district: "해운대구"
          }
        };
        
        // TODO 1: city 값 출력하기
        // 여기에 코드 작성
        
        // TODO 2: district를 "남구"로 변경하기
        // 여기에 코드 작성
        
        // TODO 3: address에 새 속성 street를 "해변로 123"으로 추가하기
        // 여기에 코드 작성
        
        console.log(student);
        ```
        
    - 예상 답변
        
        ```jsx
        var student = {
          name: "박지민",
          grade: 3,
          address: {
            city: "부산",
            district: "해운대구"
          }
        };
        
        // city 출력
        console.log(student.address.city);  // "부산"
        
        // district 변경
        student.address.district = "남구";
        
        // street 추가
        student.address.street = "해변로 123";
        
        console.log(student);
        // {
        //   name: "박지민",
        //   grade: 3,
        //   address: { city: "부산", district: "남구", street: "해변로 123" }
        // }
        ```
        

- [Q3] Bracket notation 활용하기
    - 문제
        
        ```jsx
        // 상품 정보 객체
        var product = {
          "product-name": "노트북",
          "sale-price": 1200000,
          "in-stock": true
        };
        
        // TODO 1: product-name 값 출력하기 (띄어쓰기/하이픈이 있어서 bracket notation 필수!)
        // 여기에 코드 작성
        
        // TODO 2: sale-price를 1100000으로 변경하기
        // 여기에 코드 작성
        
        // TODO 3: 변수를 사용해서 동적으로 접근하기
        var propertyName = "in-stock";
        // 여기에 코드 작성 (propertyName 변수로 값 출력)
        
        console.log(product);
        ```
        
    - 예상 답변
        
        ```jsx
        var product = {
          "product-name": "노트북",
          "sale-price": 1200000,
          "in-stock": true
        };
        
        // product-name 출력 (하이픈 때문에 dot notation 불가)
        console.log(product["product-name"]);  // "노트북"
        
        // sale-price 변경
        product["sale-price"] = 1100000;
        
        // 변수로 동적 접근
        var propertyName = "in-stock";
        console.log(product[propertyName]);  // true
        
        console.log(product);
        // { "product-name": "노트북", "sale-price": 1100000, "in-stock": true }
        ```
        

- [Q4] 메서드(함수) 포함 객체
    - 문제
        
        ```jsx
        // 계산기 객체
        var calculator = {
          result: 0,
          add: function(num) {
            this.result += num;
          },
          reset: function() {
            this.result = 0;
          }
        };
        
        // TODO 1: add 메서드로 10을 더하기
        // 여기에 코드 작성
        
        // TODO 2: add 메서드로 5를 더하기
        // 여기에 코드 작성
        
        // TODO 3: result 값 출력하기
        // 여기에 코드 작성
        
        // TODO 4: reset 메서드 실행하기
        // 여기에 코드 작성
        
        console.log(calculator.result);
        ```
        
    - 예상 답변
        
        ```jsx
        var calculator = {
          result: 0,
          add: function(num) {
            this.result += num;
          },
          reset: function() {
            this.result = 0;
          }
        };
        
        // 10 더하기
        calculator.add(10);
        
        // 5 더하기
        calculator.add(5);
        
        // result 출력
        console.log(calculator.result);  // 15
        
        // reset 실행
        calculator.reset();
        
        console.log(calculator.result);  // 0
        ```
        

---

### [정리] 실습을 통해 알 수 있는 객체의 특징

```jsx
1. 이름으로 접근 (name-based access)
   - 배열: 숫자 인덱스 (0, 1, 2...)
   - 객체: 속성 이름 ("name", "age"...)
   
   var person = { name: "김철수", age: 25 };
   console.log(person.name);  // "김철수"
   console.log(person.age);   // 25

2. 두 가지 접근 방법
   - Dot notation: person.name (간단, 읽기 쉬움)
   - Bracket notation: person["name"] (동적 접근, 특수문자 가능)
   
   var key = "age";
   console.log(person[key]);  // 25 (변수로 접근 가능!)

3. 속성 추가/삭제 자유로움
   person.city = "서울";      // 새 속성 추가
   delete person.age;         // 속성 삭제

4. 다양한 타입 혼합 가능
   var mixed = {
     text: "문자열",
     num: 123,
     arr: [1, 2, 3],
     obj: { key: "value" },
     func: function() { return "hi"; }
   };

5. 순서가 보장되지 않음 (배열과 차이점!)
   - 배열: 순서 중요 (0번째, 1번째...)
   - 객체: 순서 보장 안 됨 (이름으로만 접근)

6. 얕은 복사 (shallow copy)
   -> 곧 학습 예정! ✅✅
```

---

### Dot vs Bracket Notation 언제 사용?

```jsx
// ✅ Dot notation 사용 (일반적인 경우)
person.name
person.age

// ✅ Bracket notation 필수 (이런 경우들)
// 1. 속성명에 특수문자/공백이 있을 때
product["product-name"]
product["sale price"]

// 2. 속성명이 변수에 저장되어 있을 때
var key = "age";
person[key]  // dot notation으로 불가능!

// 3. 속성명이 숫자로 시작할 때
obj["1st-place"]
```

---

## ✅ 체크리스트

- [ ] 객체 생성 문법을 이해했다
- [ ] Dot notation과 Bracket notation 차이를 안다
- [ ] 중첩된 객체에 접근할 수 있다
- [ ] 객체에 속성을 추가/수정/삭제할 수 있다
- [ ] 객체와 배열의 차이를 설명할 수 있다