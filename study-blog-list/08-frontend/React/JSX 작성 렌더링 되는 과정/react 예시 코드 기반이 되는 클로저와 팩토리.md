# JavaScript 패턴: 클로저와 팩토리

## createRoot는 어떤 패턴인가?

```javascript
function createRoot(container) {
  return {
    render: function (element) {
      container.innerHTML = ""; // container를 기억!
      // ...
    },
  };
}
```

**둘 다 맞습니다!**

- **클로저**: `container`를 기억하는 것
- **팩토리**: 객체를 생성해서 반환하는 것

---

## 1. 클로저 (Closure)

### 정의

**함수가 자신이 생성될 때의 환경(변수)을 기억하는 것**

### 핵심 개념

```javascript
function outer() {
  const secret = "비밀"; // outer의 지역 변수

  function inner() {
    console.log(secret); // outer의 변수를 사용!
  }

  return inner;
}

const fn = outer(); // ❓❓ 왜 fn 함수를 변수 안에 넣는거지?
fn(); // '비밀' 출력

// outer()는 이미 끝났는데, secret은 어떻게 살아있나?
// → 클로저가 기억하고 있기 때문!
```

### 구체적으로, 클로저가 어떤 환경에서 작동하는지에 대한 이해 (#⭐⭐⭐)

```
outer2 함수가 실행됨
outer2 함수 내의 식별자가, 다른 스코프에서 참조가 되고 있으면 -> GC 에 의해 제거되지 않음 -> so, outer2 실행 컨텍스트는 call stack 에서 사라지지만, 메모리에서 outer2 의 result 식별자 정보는 제거되지 않음

fn2() 실행하면 -> inner1 이 나오고 -> 이걸 실행하려고 할 때는 inner1 함수의 실행이 어디에서 되는지를 스코프 에서 찾을거고 -> 그게 outer2 실행컨텍스트의 렉시컬 환경안에서 찾게 되는건가? (#❓❓❓)

만약,
1) outer2 함수를 실행함
2) outer2 함수 내에서 존재하는 변수를 해당 내부 함수에서 참조하지 않으면
3) outer2 실행컨텍스트는 제거? 되는 것?

```

```js
{
  function outer2() {
    const result = "비밀?"; // 왜 여기를 비밀로 넣은거지?

    function inner1() {
      console.log(result);
    }

    return inner1;
  }

  const fn2 = outer2(); // 이 순간, outer2 는 실행하고 -> inner1 함수를 return 하는 걸로 자신의 역할을 다함
  // fn 은 inner1 함수가 들어가 있음

  fn2(); // 이건 inner1 함수를 실행하게 됨
}
```

### 클로저가 없다면?

```javascript
// 일반적으로 함수가 끝나면 지역 변수는 사라짐
function test() {
  const x = 10;
  console.log(x);
}
test();
// 여기서 x는 사라짐 (접근 불가)
```

### 클로저가 있으면?

```javascript
function test() {
  const x = 10;

  return function () {
    console.log(x); // x를 참조하는 함수 반환
  };
}

const fn = test();
// test()는 끝났지만...
fn(); // 10 출력! x가 아직 살아있음
```

---

### 클로저 예시 1: 카운터

```javascript
function createCounter() {
  let count = 0; // 이 변수가 클로저에 의해 보존됨

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1

// count 변수에 직접 접근 불가! (캡슐화)
console.log(counter.count); // undefined
```

---

### 클로저 예시 2: 비공개 변수

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 비공개 변수

  return {
    deposit: function (amount) {
      balance += amount;
      console.log(`입금: ${amount}원, 잔액: ${balance}원`);
    },
    withdraw: function (amount) {
      if (balance >= amount) {
        balance -= amount;
        console.log(`출금: ${amount}원, 잔액: ${balance}원`);
      } else {
        console.log("잔액 부족!");
      }
    },
    getBalance: function () {
      return balance;
    },
  };
}

const account = createBankAccount(10000);
account.deposit(5000); // 입금: 5000원, 잔액: 15000원
account.withdraw(3000); // 출금: 3000원, 잔액: 12000원

// balance에 직접 접근 불가!
account.balance = 1000000; // 이렇게 해도 실제 balance는 안 바뀜
console.log(account.getBalance()); // 12000
```

---

### 클로저 예시 3: createRoot 분석

```javascript
function createRoot(container) {
  // container는 클로저에 의해 보존됨

  return {
    render: function (element) {
      // 여기서 container 사용 가능!
      container.innerHTML = "";
      container.appendChild(createDOM(element));
    },
  };
}

const root = createRoot(document.getElementById("root"));
// createRoot()는 끝났지만...

root.render(element); // container를 아직 기억하고 있음!
```

---

## 2. 팩토리 패턴 (Factory Pattern)

### 정의

**객체를 생성해서 반환하는 함수**

`new` 키워드 없이 객체를 만드는 패턴

### 기본 형태

```javascript
// 팩토리 함수
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    sayHi: function () {
      console.log(`안녕! 나는 ${name}이야.`);
    },
  };
}

// 사용
const person1 = createPerson("철수", 20);
const person2 = createPerson("영희", 25);

person1.sayHi(); // 안녕! 나는 철수야.
person2.sayHi(); // 안녕! 나는 영희야.
```

---

### 팩토리 vs 생성자 함수

```javascript
// 방법 1: 팩토리 패턴
function createCar(brand) {
  return {
    brand: brand,
    drive: function () {
      console.log(`${brand} 출발!`);
    },
  };
}
const car1 = createCar("BMW"); // new 없이 사용

// 방법 2: 생성자 함수
function Car(brand) {
  this.brand = brand;
  this.drive = function () {
    console.log(`${brand} 출발!`);
  };
}
const car2 = new Car("BMW"); // new 필요
```

| 구분         | 팩토리 패턴        | 생성자 함수      |
| ------------ | ------------------ | ---------------- |
| 호출         | `createCar('BMW')` | `new Car('BMW')` |
| `new` 키워드 | 불필요             | 필요             |
| `this`       | 사용 안 함         | 사용             |
| 비공개 변수  | 쉬움 (클로저)      | 어려움           |

---

### 팩토리 예시 1: 게임 캐릭터

```javascript
function createCharacter(name, type) {
  // 비공개 변수
  let hp = 100;
  let level = 1;

  return {
    name: name,
    type: type,
    attack: function () {
      console.log(`${name}의 공격!`);
    },
    takeDamage: function (damage) {
      hp -= damage;
      console.log(`${name}이(가) ${damage} 피해를 입음. 남은 HP: ${hp}`);
    },
    levelUp: function () {
      level++;
      hp += 20;
      console.log(`${name} 레벨업! Lv.${level}, HP: ${hp}`);
    },
    getStatus: function () {
      return { name, type, hp, level };
    },
  };
}

const warrior = createCharacter("용사", "전사");
const mage = createCharacter("마법사", "마법");

warrior.attack(); // 용사의 공격!
warrior.takeDamage(30); // 용사이(가) 30 피해를 입음. 남은 HP: 70
warrior.levelUp(); // 용사 레벨업! Lv.2, HP: 90

console.log(warrior.getStatus());
// { name: '용사', type: '전사', hp: 90, level: 2 }
```

---

### 팩토리 예시 2: API 클라이언트

```javascript
function createApiClient(baseUrl) {
  // baseUrl을 클로저로 기억

  return {
    get: async function (endpoint) {
      const response = await fetch(`${baseUrl}${endpoint}`);
      return response.json();
    },
    post: async function (endpoint, data) {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  };
}

// 사용
const api = createApiClient("https://api.example.com");
// api.get('/users')  → https://api.example.com/users
// api.post('/users', { name: '철수' })
```

---

### 팩토리 예시 3: 로거

```javascript
function createLogger(prefix) {
  return {
    log: function (message) {
      console.log(`[${prefix}] ${message}`);
    },
    error: function (message) {
      console.error(`[${prefix}] ERROR: ${message}`);
    },
    warn: function (message) {
      console.warn(`[${prefix}] WARNING: ${message}`);
    },
  };
}

const authLogger = createLogger("AUTH");
const dbLogger = createLogger("DB");

authLogger.log("로그인 성공"); // [AUTH] 로그인 성공
authLogger.error("토큰 만료"); // [AUTH] ERROR: 토큰 만료
dbLogger.log("연결 성공"); // [DB] 연결 성공
dbLogger.warn("느린 쿼리 감지"); // [DB] WARNING: 느린 쿼리 감지
```

---

## 3. 클로저 + 팩토리 조합

### createRoot 다시 보기

```javascript
function createRoot(container) {
  //      ↑ 팩토리: 객체를 생성해서 반환
  //      ↓ 클로저: container를 기억

  return {
    render: function (element) {
      container.innerHTML = "";
      container.appendChild(createDOM(element));
    },
  };
}
```

### 또 다른 예시: 타이머

```javascript
function createTimer(name) {
  // 클로저로 보존되는 변수들
  let seconds = 0;
  let intervalId = null;

  // 팩토리로 반환되는 객체
  return {
    start: function () {
      if (intervalId) return; // 이미 실행 중

      intervalId = setInterval(() => {
        seconds++;
        console.log(`[${name}] ${seconds}초`);
      }, 1000);
    },
    stop: function () {
      clearInterval(intervalId);
      intervalId = null;
    },
    reset: function () {
      this.stop();
      seconds = 0;
    },
    getTime: function () {
      return seconds;
    },
  };
}

const timer1 = createTimer("타이머1");
const timer2 = createTimer("타이머2");

timer1.start();
// [타이머1] 1초
// [타이머1] 2초
// ...

setTimeout(() => {
  timer1.stop();
  console.log(`경과 시간: ${timer1.getTime()}초`);
}, 5000);
```

---

## 4. 요약

### 클로저 (Closure)

| 항목 | 설명                                  |
| ---- | ------------------------------------- |
| 정의 | 함수가 자신이 생성될 때의 환경을 기억 |
| 용도 | 비공개 변수, 상태 유지                |
| 핵심 | 내부 함수가 외부 함수의 변수를 참조   |

```javascript
function outer() {
  const x = 10; // 기억됨
  return function () {
    console.log(x);
  };
}
```

### 팩토리 패턴 (Factory)

| 항목 | 설명                          |
| ---- | ----------------------------- |
| 정의 | 객체를 생성해서 반환하는 함수 |
| 용도 | 비슷한 객체 여러 개 생성      |
| 핵심 | `new` 없이 객체 생성          |

```javascript
function createSomething(param) {
    return {
        method: function() { ... }
    };
}
```

### 둘의 조합

```javascript
function createRoot(container) {
  // ↑ 팩토리: 객체 반환
  // ↓ 클로저: container 기억
  return {
    render: function (element) {
      container.innerHTML = "";
    },
  };
}
```

---
