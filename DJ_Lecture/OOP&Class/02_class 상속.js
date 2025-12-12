class 몬스터본체 {
  power = 10; // const, let 은 빠져야 함

  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log(`내 공격력은 ${this.power} 야!`);
  };

  /* 이렇게도 가능함! 
        attack(){
        
        }*/

  run = () => {
    console.log("도망가자");
  };
}

class 공중몬스터 extends 몬스터본체 {
  run = () => {
    // 공중몬스터는 날아가야 하니까.
    console.log("날아가자."); // 로 변경
    // 이렇게 변경하면, 원본 함수를 '덮어씀'
    // ⭐⭐⭐ 자식 이기는 부모 없음. 자식이 우선 순위 (#overriding 했다.)
  };
}

class 지상몬스터 extends 몬스터본체 {
  run = () => {
    // 공중몬스터는 날아가야 하니까.
    console.log("기어서 기어서 가자."); // 로 변경
    // 이렇게 변경하면, 원본 함수를 '덮어씀'
    // ⭐⭐⭐ 자식 이기는 부모 없음. 자식이 우선 순위 (#overriding 했다.)
  };
}

const newMonster1 = new 공중몬스터(100);
newMonster1.attack(); // 부모의 함수를 꺼내쓸 수 있다.
newMonster1.run(); // 자식이 overriding 하면, '덮어 써짐'!!!

const newMonster2 = new 지상몬스터(200);
newMonster2.attack(); // 부모의 함수를 꺼내쓸 수 있다.
newMonster2.run(); // 자식이 overriding 하면, '덮어 써짐'!!!

/* 2️⃣ super 2 */

class 몬스터본체2 {
  power = 10; // const, let 은 빠져야 함

  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log(`내 공격력은 ${this.power} 야!`);
  };

  /* 이렇게도 가능함! 
        attack(){
        
        }*/

  run = () => {
    console.log("도망가자");
  };
}

class 공중몬스터2 extends 몬스터본체2 {
  constructor(aaa) {
    super(aaa + 777);
  }

  run = () => {
    // 공중몬스터는 날아가야 하니까.
    console.log(`날아가자111. ${this.power}`); // 로 변경
    // 이렇게 변경하면, 원본 함수를 '덮어씀'
    // ⭐⭐⭐ 자식 이기는 부모 없음. 자식이 우선 순위 (#overriding 했다.)
  };
}
class 지상몬스터2 extends 몬스터본체2 {
  constructor(aaa) {
    super(aaa);
  }

  run = () => {
    // 공중몬스터는 날아가야 하니까.
    console.log("날아가자."); // 로 변경
    // 이렇게 변경하면, 원본 함수를 '덮어씀'
    // ⭐⭐⭐ 자식 이기는 부모 없음. 자식이 우선 순위 (#overriding 했다.)
  };
}

const newParentMonster1 = new 공중몬스터2(100000000000); // 공중몬스터(자식)이 부모의 기초공사 함수에게 넘겨주고 싶을 때
newParentMonster1.attack(); // 부모의 함수를 꺼내쓸 수 있다.
newParentMonster1.run(); // 자식이 overriding 하면, '덮어 써짐'!!!
