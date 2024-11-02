# side effect

## 관련 개념 

1. 모노레포는 '코드를 묶는 공통화를 repository' 레벨에서 하는데, 이때 공통화 시 발생되는 이슈가 'side effect' 였음. 이때, side effect 라는 키워드가 리액트의 side effect 와 동일한 건지 궁금했음 


## 리액트에서의 side effect 
```
- 리액트는 '예상치 못 한 상태 변화' 를 막고 '예측 가능한 상태 관리' 를 위해서 
    1) 컴포넌트가 마운트, 업데이트, 언마운트 될 때 상태를 제어할 수 있게 했다. 
    2) 불변성 : 상태를 변경할 때, 새로운 객체를 생성한다. -> 그래서, 이전 상태를 유지 한다. -> 다른 컴포넌트, 기능에 미치는 문제를 방지한다. (#⭐⭐⭐⭐⭐⭐⭐)

```


## 구체적으로 리액트에서 side effect 라는게 뭐지? 어떤 순간을 말하는 거지? 

### 1. useEffect에서 비동기 데이터 호출 예시
- 데이터 호출 중 컴포넌트가 언마운트되면 원하지 않는 상태 업데이트가 시도될 수 있음. (#📛📛📛📛📛📛 아직 잘 이해가 안 돼) (#✅TODO 좀 더 살펴보기)
```js
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      setUserData(data); // 컴포넌트가 언마운트된 경우 오류 발생 가능
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      {userData ? <p>{userData.name}</p> : <p>Loading...</p>}
    </div>
  );
}

```

### 2. 클린업 함수 사용하여, 언마운트 되었는지 여부를 확인하는 방식으로 부작용 방지 

```js
useEffect(() => {
  let isMounted = true;

  async function fetchData() {
    const response = await fetch(`/api/user/${userId}`);
    const data = await response.json();
    if (isMounted) {
      setUserData(data);
    }
  }
  fetchData();

  return () => {
    isMounted = false; // 컴포넌트가 언마운트되면 isMounted 플래그를 false로 설정
  };
}, [userId]);

```




## 불변성은 어떤 순간을 말하는 거지? 

1. orange 가 렌더링 안 된다. 왜냐면...
```
- items 배열은 참조형 데이터 임. 직접 내용을 수정한다고 해서, 기존 배열이 가리키는 메모리 주소는 변경되지 않음. 메모리 주소가 바뀌지 않았으므로 리액트는 변경이 없다고 판단하여 업데이트를 하지 않음. 
```
```js 
import React, { useState } from 'react';

function ItemList() {
  const [items, setItems] = useState(['apple', 'banana', 'cherry']);

  const addItem = () => {
    items.push('orange'); // 불변성 유지 실패
    setItems(items); // 업데이트가 예상대로 되지 않음
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

2. orange 를 '새롭게 생성된 배열' 에 추가하면, 리액트는 변경됨을 감지하고 -> 새롭게 렌더링을 하게 된다. 
```js
const addItem = () => {
  setItems([...items, 'orange']); // 새로운 배열을 생성하여 상태 업데이트
};
```