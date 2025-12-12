### 세부 목표

### 상속과 전략패턴이 비슷한데, 차이점이 있음!

```jsx
- 몸통을 가지고, 특정 기능 추가할래? 
	: 몬스터 본체 만들어서 -> 날아다니는 기능 추가로 만들었음. 
	: '상속'

- 몸통을 가지고, 그 내부를 바꿀래? 
	: '전략 패턴' 
```

![image.png](attachment:3a8655d7-fc71-47cd-9b81-053ff1b546c4:image.png)

### [전략 패턴] 이제 ‘부품’ 을 만들어서, 넣어줄거야

```jsx
상속 받지 않고, 부품을 갈아 끼우는것! 
```

```jsx

class 지상부품 {
	run = () => {
		console.log("달려서 도망가자")
	}	
}

class 하늘부품 {
	run = () => {
		console.log("날아서 공격하자")
	}	
}

class 몬스터본체 {
  power = 10; // const, let 은 빠져야 함
  
  부품; // 초기값 없으면 안 줘도 됨. 변수 만들 때랑 똑같음
  // this.부품 이 생략되어 있음. 
  // 여기에서 this 는 class 자기 자신!!! 

  constructor(qqq) {
    this.부품 = qqq 
    // 3️⃣ 부품 변수에 담았음!!! (#⭐⭐⭐ 이 순간 class 고유의 공간이 존재)
	  // -> 이로 인해, this.부품.run() 이 가능함!!! 
  }

  attack = () => {
    console.log(`내 공격력은 ${this.power} 야!`);
  };

  run = () => {
    this.부품.run() // 4️⃣ 이 클래스에서 부품에 저장한 run 을 실행한다. 
  };
}

const aaa = new 지상부품() // 1️⃣ 지상 부품에서 객체를 꺼냄
const newParentMonster1 = new 몬스터본체(aaa); // 2️⃣ 그걸 class 에 넣음 
newParentMonster1.attack(); // 부모의 함수를 꺼내쓸 수 있다.
newParentMonster1.run(); // 자식이 overriding 하면, '덮어 써짐'!!!

const newParentMonster1 = new 몬스터본체(new 하늘부품 ); 
newParentMonster1.attack(); // 부모의 함수를 꺼내쓸 수 있다.
newParentMonster1.run(); // 자식이 overriding 하면, '덮어 써짐'!!!
```

```jsx
껍데기가 같음 
내부 부품을 변경시킴 
자식을 따로 만들지 않음 
그 안에서 교체를 함 
```

- [전략패턴] 몬스터를 만들고 > 사용할 때, 공중몬스터를 만들지, 지상 몬스터를 만들지를 결정할 수 있음. (#⭐⭐⭐⭐⭐ #유지보수에 더 좋음 #⭐⭐⭐)
    
    ```jsx
    몬스터를 만들고 
    	-> 사용할 때, 공중몬스터를 만들지, 지상 몬스터를 만들지를 결정할 수 있음. 
    ```
    
    ![image.png](attachment:24561524-bce7-4f7b-a5c8-dd03551764b6:image.png)
    
- [상속] 상속을 받으면 > 애초에 공중 몬스터 class 를 만들고, 지상 몬스터 class 를 만들어야 하는 상황 (#⭐⭐⭐⭐⭐)
    
    ![image.png](attachment:471acef3-64a5-4041-b63b-5a740c87d5fd:image.png)