/* 1️⃣ 생성자 없이ㅣ */
// 이건, Monster 만드는 '설명서' 임
// 이걸로 이제 찍어낼거야!
class Monster {
  power = 10; // const, let 은 빠져야 함

  // 화살표 함수도 가능한데, const 를 안 적음!
  // this 는 이 클래스 내부에서 접근하고 싶을때❓
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

// 찍어내기
// 직접 만들어낸 객체
const myMonster_1 = new Monster();
// 이 몬스터는
myMonster_1.run(); // 도망갈 수 있고
myMonster_1.attack(); // 공격 할 수 있고

// 설명서로 만들어낸 사물
const myMonster_2 = new Monster();
myMonster_2.run(); // 도망갈 수 있고
myMonster_2.attack(); // 공격 할 수 있고

/* 2️⃣ 생성자 있게 */
class Monster_2 {
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

const monster_2_1 = new Monster_2(100);
console.log(monster_2_1.attack());
