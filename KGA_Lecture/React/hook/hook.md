# React Hooks

## 요약

**Hooks**는 React 16.8에서 도입된 기능으로, 함수형 컴포넌트에서 state와 lifecycle 등 React 기능을 사용할 수 있게 해주는 특수한 함수입니다.

```
클래스 컴포넌트의 문제점 → Hooks로 해결
├─ 상태 로직 재사용 어려움 → Custom Hooks
├─ 복잡한 lifecycle 관리 → useEffect로 통합
├─ this 바인딩 혼란 → 함수형으로 해결
└─ 최적화 제약 → 더 나은 컴파일 최적화
```

---

## 학습 목표

1. Hooks가 등장한 배경과 해결하는 문제를 이해한다
2. 주요 Hooks (useState, useEffect, useContext, useRef)의 용도를 구분한다
3. 함수형 컴포넌트에서 state와 side effect를 다룰 수 있다

---

## Hook이 등장하게 된 이유 (#원인 #배경 #문제점)

### 클래스 컴포넌트의 문제점

#### 1. 상태 로직 재사용의 어려움

```jsx
// ❌ 기존 방식: HOC (Higher-Order Component) - Wrapper Hell 발생
const EnhancedComponent = withRouter(withAuth(withTheme(MyComponent)));

// DevTools에서 보면:
// <WithRouter>
//   <WithAuth>
//     <WithTheme>
//       <MyComponent />
//     </WithTheme>
//   </WithAuth>
// </WithRouter>
```

- render props, HOC 패턴은 컴포넌트 구조를 복잡하게 만듦
- DevTools에서 "Wrapper Hell" 현상 발생

#### 2. 복잡한 컴포넌트 관리

```jsx
// ❌ 클래스 컴포넌트: 관련 없는 로직이 lifecycle에 섞임
class ChatRoom extends Component {
  componentDidMount() {
    // 데이터 페칭 (기능 A)
    this.fetchData();
    // 이벤트 리스너 설정 (기능 B)
    window.addEventListener('resize', this.handleResize);
    // 채팅 연결 (기능 C)
    this.connection = createConnection();
  }

  componentWillUnmount() {
    // 정리 로직이 여기저기 흩어짐
    window.removeEventListener('resize', this.handleResize);
    this.connection.disconnect();
  }
}
```

- 관련된 로직이 여러 lifecycle 메서드에 흩어짐
- 관련 없는 로직이 하나의 메서드에 뒤섞임

#### 3. JavaScript `this`의 복잡성

```jsx
// ❌ 클래스 컴포넌트: this 바인딩 필요
class Button extends Component {
  constructor() {
    super();
    // 매번 바인딩 해줘야 함
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state.count); // this가 undefined일 수 있음
  }
}
```

- `this`가 다른 언어와 다르게 동작
- 이벤트 핸들러마다 바인딩 필요
- 초보자에게 큰 학습 장벽

#### 4. 최적화의 제약

- 클래스는 minify가 잘 안 됨
- 핫 리로딩이 불안정
- 사전 컴파일 최적화 어려움

---

## 상세 설명

### Hooks의 해결책

```jsx
// ✅ 함수형 컴포넌트 + Hooks: 관련 로직끼리 묶음
function ChatRoom({ roomId }) {
  // 기능 A: 데이터 페칭
  useEffect(() => {
    fetchData(roomId);
  }, [roomId]);

  // 기능 B: 이벤트 리스너
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 기능 C: 채팅 연결
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
}
```

---

### 주요 Hooks 분류

#### 1. State Hooks (상태 관리)

| Hook | 용도 | 사용 시점 |
|------|------|----------|
| `useState` | 단순한 상태 관리 | 대부분의 경우 |
| `useReducer` | 복잡한 상태 로직 | 상태 업데이트 로직이 복잡할 때 |

```jsx
// useState 예시
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// useReducer 예시 (복잡한 상태)
function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  // dispatch({ type: 'ADD', payload: newTodo })
}
```

#### 2. Effect Hooks (부수 효과)

| Hook | 용도 | 실행 시점 |
|------|------|----------|
| `useEffect` | 외부 시스템 동기화 | 렌더링 후 (비동기) |
| `useLayoutEffect` | 레이아웃 측정 | DOM 변경 후, 페인트 전 |

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    // 연결 설정 (컴포넌트 마운트 시)
    const connection = createConnection(roomId);
    connection.connect();

    // 정리 함수 (컴포넌트 언마운트 시)
    return () => connection.disconnect();
  }, [roomId]); // roomId 변경 시 재실행
}
```

#### 3. Context Hooks (전역 상태)

```jsx
// Context 생성
const ThemeContext = createContext('light');

// 사용
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

#### 4. Ref Hooks (DOM 접근)

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // DOM 직접 접근
  };

  return <input ref={inputRef} />;
}
```

#### 5. Performance Hooks (최적화)

| Hook | 용도 | 캐싱 대상 |
|------|------|----------|
| `useMemo` | 계산 결과 캐싱 | 값 |
| `useCallback` | 함수 캐싱 | 함수 |

```jsx
function TodoList({ todos, filter }) {
  // 비싼 계산 결과 캐싱
  const filteredTodos = useMemo(
    () => todos.filter(todo => todo.status === filter),
    [todos, filter]
  );

  // 함수 캐싱 (자식 컴포넌트 리렌더링 방지)
  const handleClick = useCallback(
    () => console.log(todos),
    [todos]
  );
}
```

---

### Hooks 규칙 (Rules of Hooks)

```
1. 최상위에서만 호출
   ❌ 조건문, 반복문, 중첩 함수 안에서 호출 금지
   ✅ 컴포넌트 최상위 레벨에서만 호출

2. React 함수 내에서만 호출
   ❌ 일반 JavaScript 함수에서 호출 금지
   ✅ 함수형 컴포넌트 또는 Custom Hook에서만 호출
```

```jsx
// ❌ 잘못된 예시
function MyComponent() {
  if (condition) {
    const [count, setCount] = useState(0); // 조건문 안에서 호출
  }
}

// ✅ 올바른 예시
function MyComponent() {
  const [count, setCount] = useState(0); // 최상위에서 호출

  if (condition) {
    // count 사용
  }
}
```

---

## Custom Hooks (커스텀 훅)

> 📖 이 섹션은 [React 공식 문서 - Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)를 해석한 내용입니다.

### Custom Hook이란?

Custom Hook은 **컴포넌트 로직을 재사용 가능한 함수로 추출한 것**입니다.

React는 `useState`, `useEffect` 같은 내장 Hook을 제공하지만, 애플리케이션에 맞는 **나만의 Hook**을 만들 수 있습니다.

---

### 왜 Custom Hook이 필요한가?

#### 문제: 로직 중복

온라인 상태를 표시하는 두 컴포넌트가 있다고 가정합니다:

```jsx
// StatusBar.js - 온라인 상태 표시
function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

// SaveButton.js - 온라인일 때만 저장 가능
function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // ⚠️ 위와 똑같은 코드가 반복됨!
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <button disabled={!isOnline}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}
```

**문제점**: 똑같은 로직이 두 컴포넌트에 복사-붙여넣기 되어 있습니다.

---

### 해결: Custom Hook으로 추출

중복된 로직을 `use`로 시작하는 함수로 추출합니다:

```jsx
// useOnlineStatus.js
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;  // 상태 값을 반환
}
```

이제 컴포넌트가 훨씬 간결해집니다:

```jsx
// StatusBar.js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

// SaveButton.js
import { useOnlineStatus } from './useOnlineStatus.js';

function SaveButton() {
  const isOnline = useOnlineStatus();
  return (
    <button disabled={!isOnline}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}
```

---

### Hook 이름 규칙

#### 필수: `use`로 시작 + 대문자

```
✅ 올바른 이름
├─ useState (내장)
├─ useEffect (내장)
├─ useOnlineStatus (커스텀)
└─ useChatRoom (커스텀)

❌ 잘못된 이름
├─ getOnlineStatus (use로 시작 안 함)
└─ useonlinestatus (대문자 없음)
```

#### 왜 이 규칙이 중요한가?

1. **시각적 구분**: Hook인지 아닌지 바로 알 수 있음
2. **린터 검사**: Hook 규칙 위반을 자동으로 감지
3. **호출 제한**: Hook은 컴포넌트/Hook 안에서만 호출 가능

---

### `use`를 붙이지 말아야 할 때

**다른 Hook을 사용하지 않는 함수**에는 `use`를 붙이지 않습니다:

```jsx
// 🔴 피해야 함: Hook을 사용하지 않는데 use를 붙임
function useSorted(items) {
  return items.slice().sort();
}

// ✅ 좋음: 일반 함수로 작성
function getSorted(items) {
  return items.slice().sort();
}
```

일반 함수는 조건문 안에서 호출할 수 있습니다:

```jsx
function List({ items, shouldSort }) {
  let displayedItems = items;

  if (shouldSort) {
    displayedItems = getSorted(items);  // ✅ 조건부 호출 가능
  }
  // ...
}
```

---

### 중요: Custom Hook은 로직만 공유하고, 상태는 공유하지 않는다

```jsx
function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');
  // ↑ 이 둘은 완전히 독립된 상태!
}
```

위 코드는 아래와 동일합니다:

```jsx
function Form() {
  // firstNameProps용 상태
  const [firstName, setFirstName] = useState('Mary');

  // lastNameProps용 상태 (완전히 별개)
  const [lastName, setLastName] = useState('Poppins');
}
```

**핵심**: Custom Hook을 호출할 때마다 **새로운 독립적인 상태**가 생성됩니다.

---

### Custom Hook에 값 전달하기

Custom Hook은 컴포넌트가 리렌더링될 때마다 최신 props와 state를 받습니다:

```jsx
// useChatRoom.js
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection({ serverUrl, roomId });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);  // 값이 바뀌면 재실행
}

// ChatRoom.js
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  // serverUrl이나 roomId가 바뀌면 Hook이 다시 동기화됨
}
```

---

### 언제 Custom Hook을 만들어야 하나?

#### ✅ 추출하면 좋은 경우

1. **Effect 로직이 여러 컴포넌트에서 중복될 때**
2. **외부 시스템과 동기화하는 로직** (API, WebSocket, 브라우저 API 등)
3. **로직이 복잡해서 분리하면 가독성이 좋아질 때**

#### ❌ 굳이 추출 안 해도 되는 경우

- 단순한 `useState` 하나를 감싸는 경우
- 한 곳에서만 쓰이는 간단한 로직

---

### 실용적인 예시: 데이터 페칭 Hook

```jsx
// useData.js
function useData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;

      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
          }
        });

      return () => {
        ignore = true;  // cleanup: 이전 요청 무시
      };
    }
  }, [url]);

  return data;
}

// 사용 예시
function ShippingForm({ country }) {
  const cities = useData(`/api/cities?country=${country}`);
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
  // ...
}
```

---

### Custom Hook의 장점: 쉬운 업그레이드

내부 구현을 바꿔도 사용하는 컴포넌트는 수정할 필요가 없습니다:

```jsx
// 기존 구현
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => { /* ... */ }, []);
  return isOnline;
}

// 새 구현 (useSyncExternalStore 사용)
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
}

// 컴포넌트는 변경 없음!
function StatusBar() {
  const isOnline = useOnlineStatus();  // 그대로 동작
}
```

---

### Custom Hook 작명 가이드

#### 좋은 이름 (구체적인 목적)

```
✅ useData(url)
✅ useOnlineStatus()
✅ useChatRoom(options)
✅ useMediaQuery(query)
✅ useLocalStorage(key)
```

#### 피해야 할 이름 (너무 일반적)

```
🔴 useMount(fn)
🔴 useEffectOnce(fn)
🔴 useUpdateEffect(fn)
```

이런 "라이프사이클 Hook"은 React 패러다임에 맞지 않고, 의존성 린터를 우회하게 됩니다.

---

### Custom Hook 요약

| 항목 | 설명 |
|------|------|
| **정의** | 다른 Hook을 사용하는 재사용 가능한 함수 |
| **이름 규칙** | `use` + 대문자로 시작 |
| **상태 공유** | ❌ 각 호출마다 독립적인 상태 |
| **값 전달** | 컴포넌트의 props/state를 인자로 받을 수 있음 |
| **장점** | 로직 재사용, 깔끔한 컴포넌트, 쉬운 업그레이드 |

---

## 퀴즈

### Q1. Hooks가 등장한 주요 이유가 아닌 것은?

A) 클래스 컴포넌트의 `this` 바인딩 문제
B) 상태 로직 재사용의 어려움
C) 함수형 프로그래밍이 더 빠르기 때문
D) lifecycle 메서드에 로직이 흩어지는 문제

<details>
<summary>정답</summary>

**C)** - Hooks는 성능 때문이 아니라 코드 구조와 재사용성 문제를 해결하기 위해 등장했습니다.

</details>

---

### Q2. 다음 코드의 문제점은?

```jsx
function MyComponent({ condition }) {
  if (condition) {
    const [count, setCount] = useState(0);
  }
  // ...
}
```

<details>
<summary>정답</summary>

**조건문 안에서 Hook을 호출함** - Hook은 항상 컴포넌트 최상위에서 호출해야 합니다. 조건에 따라 Hook 호출 순서가 바뀌면 React가 상태를 추적할 수 없습니다.

</details>

---

### Q3. useEffect vs useLayoutEffect 차이는?

<details>
<summary>정답</summary>

- **useEffect**: 렌더링 후 비동기로 실행 (화면 페인트 후)
- **useLayoutEffect**: DOM 변경 후, 화면 페인트 전에 동기로 실행

레이아웃을 측정하거나 DOM을 동기적으로 수정해야 할 때 useLayoutEffect를 사용합니다.

</details>

---

### Q4. useMemo와 useCallback의 차이는?

<details>
<summary>정답</summary>

- **useMemo**: 계산된 **값**을 캐싱
- **useCallback**: **함수 자체**를 캐싱

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

</details>

---

## 출처

- [React 공식 문서 - Hooks](https://react.dev/reference/react/hooks)
- [React 공식 문서 - Hooks 소개](https://legacy.reactjs.org/docs/hooks-intro.html)
