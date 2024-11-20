
## 흔히 발생하는 오류 

```js
const DeliveryForm = () => {

const [values, setValues] = useState({
    customerName : "James", 
    mobile : "010-123-1237"
})


return (
  <form>
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Customer Name"
        value={values.customerName}
      />
      <label>Customer Name</label>
    </div>
  </form>
)
}
```

- 이렇게 작성한 경우, 아래와 같은 에러 발생 

```
You provided a 'value' prop to a form field without an 'onChange' handler. This will render a read-only field. If the field should be mutable use 'defaultValue'. Otherwise, set either 'onChange' or 'readOnly'
```

![Image](https://i.imgur.com/RsBMBcq.png)

<br />


## 왜, 위와 같은 에러가 왜 발생하는 건가? (#mutable, read-only)

1. [사전 전제] 리액트는 input form이 read-only 상태인가, mutable 상태인가에 따라서, '값을 받는 방식 및 attribute 가 다름' 

```bash
- 리액트에서는, 'onChange' handler 가 없이, form field 에 value 를 전달하면, 리액트는 해당 form field를 'read-only' 로 다룬다.

- '값을 변경할 수 있는 상태' 는 'mutable' 임. 
    - mutable 상태에서 
        1) 초기값은 defaultValue 속성
        2) 값을 변경하려면, onChange 속성을 통해서 변경

- 값을 변경할 수 없는 상태는 'immutable' 임. 
    - 사용자가 값을 변경할 수 없으므로, read-only 상태 임. 
    - 이때, 값을 받는 곳은 value 

```

## react 에서 form 을 다루는 일반적인 방식 (#useState 의 state 가 '신뢰 가능한 단일 출처' 가 된다. #제어 컴포넌트)
- 리액트에서 해당 input 태그가 mutable 인 경우 (#⭐⭐⭐⭐⭐ 이게 React 에서 form 을 다루는 방식)
```js
const DeliveryForm = () => {

const [values, setValues] = useState({
    customerName : "James", 
    mobile : "010-123-1237"
})

const handleInputChange = (event) => {
    // event 핸들링 로직
}

return (
  <form>
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Customer Name"
        value={values.customerName}
        onChange={handleInputChange}
      />
      <label>Customer Name</label>
    </div>
  </form>
)
}
```

2. 이것은 React 가 자체적으로 개발한 건가? 아니면 input 태그 자체가 이렇게 설계 된 건가? (#제어 controlled component, 비제어 컴포넌트 uncontrolled component)



## 신뢰 가능한 단일 출처에 대해서 (#우테코) 

- '신뢰 가능한 단일 출처' 란? 
  : '하나의 상태' 는 '한 곳' 에만 있어야 한다. 

- '신뢰 가능한 단일 출처(single source of truth)' 원칙을 지키는데 있어서, 기존 HTML 태그는 문제가 된다? 

- '제어 컴포넌트' 는, FORM 의 사용자 입력값을, REACT 가 제어
    - 이건, 이제, '신뢰 가능한 단일 출처(single source of truth)' 성질을 구현하기 위해서 
    - value, onChange 를 사용한다. 


## 신뢰가능한 단일 출처의 관점에서 제어 컴포넌트 
```
- name state(useState 의 첫 번째 인자)가, '신뢰 가능한 단일 출처' 가 된다.
- 즉, value 속성 + state 를 결합 -> state 를 '신뢰 가능한 단일 출처' 로 사용함.
    - 이때, value + onChange 조합을 쓰는 건 react 에서 read-only 가 아니라, mutable 한 상태를 만들 때 사용 되는 것 
```
![Image](https://i.imgur.com/afxwPce.png)
![Image](https://i.imgur.com/81gM4wU.png)



## 신뢰가능한 단일 출처의 관점에서 비제어 컴포넌트 
```
- react 가 form 의 입력값을 제어하지 않는다. 

- 그럼 누가? 어떻게? 

- 
이 경우, value 속성이, '신뢰 가능한 단일 출처' 를 갖게 된다. 
```

![Image](https://i.imgur.com/j7hdSdi.png)


<br />

- 제어 vs 비제어 비교 
```
- 제어 컴포넌트의 경우, 
    - 사용자가 입력 -> onChange 이벤트가 발생 -> onChange 에 state 의 setState 메서드가 바인딩 외어 있으므로, 값 갱신 -> setState 가 실행되었으므로, '리렌더링 발생' (#❓❓왜 리액트는 이렇게 설계 한거지❓❓)

- 비제어 컴포넌트 
    - 데이터 관리 주체가 DOM 
    - 사용자가 submit 이벤트를 발생시키면 -> DOM 에 접근해서 값을 pull 해온다. 
        - 이때, ref 를 사용해서 직접 DOM 에 컨택하기 때문에, 리렌더링이 발생되지 않음.

- 사용 
    - '실시간성' 이 있는 경우, '제어 컴포넌트' 로 활용하게 됨
    - '이름 및 주소 필드' 가 채워졌을 때, '제출 버튼 활성화' 를 시킬 수 있음. 
```
![Image](https://i.imgur.com/XwK2aZO.png)
![Image](https://i.imgur.com/AFlZ7zi.png)
![Image](https://i.imgur.com/62b0czN.png)


- 궁금증 
    - setState 가 실행되었으므로, '리렌더링 발생' (#❓❓왜 리액트는 이렇게 설계 한거지❓❓)


- 제어 컴포넌트의 단점 
```
- 사용자 값이 변경될 때 마다 리렌더링 
- 모든 Form Elements 에 React 상태를 연결 (#❓❓❓ 왜)
- non-React 코드로 작성된 Form Elements 코드 통합이 어려움 
```

![Image](https://i.imgur.com/Ql8yDVx.png)



- React Hook Form 
```
- 비제어 컴포넌트 사용 

- subscribe 기능을 통해, 즉각적인 데이터 송수신을 보완
```


## 정리하면 

```bash
0. 신뢰 가능한 단일 출처를 달성하고자 함

1. React 에서 form 상태를 관리하는 방식에는 '제어' 와 '비제어' 가 있음 

2. '제어' 의 경우, 
    - mutable 상태 이므로, value + onchange 조합을 이용해서 관리 
    - onchange 이벤트 이기 때문에 -> 입력할 때 마다 변경 -> 리렌더링 유발 

3. 리액트 훅 폼은 
    - 비제어 기반
    - 실시간성 단점을 subscribe 를 통해 극복 

```






# 출처 
- difficulities with normal ways of creating react hook forms ([udemy](https://bit.ly/4hpkMF8))
- [react 공식문서](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) 
- [제어 컴포넌트, 비제어 컴포넌트 톺아보기](https://velog.io/@yukyung/React-%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EB%B9%84%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0)
- ![Image](https://i.imgur.com/0I6F7YF.png)