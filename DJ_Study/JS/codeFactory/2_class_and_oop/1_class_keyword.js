/**
 * Class keyword
 */

// 1. 하드코딩
// class IdolModel {
//   name;
//   year;

//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//   }

//   sayName() {
//     return "안녕하세요. 안유진 입니다.";
//   }
// }

// const yujin = new IdolModel("안유진", 2008);
// const guli = new IdolModel("굴리", 2008);
// const angel = new IdolModel("엔젤", 2008);
// console.log(yujin.sayName());
// console.log(guli.sayName());
// console.log(angel.sayName());

// 2. 하드코딩이 아니라, 인스턴스를 생성할 때, 파라미터로 전달한 이름을, 콘솔로 찍고 싶을 때!!!
// 1) 파라미터로 전달하면 constructor 의 name 프로퍼티로 들어감
// 2) 위에서 this.name 속성에 name 인자를 할당했음
// 3) 그러면, 다른 함수에서 this.name 을 꺼내쓸 수 있게 됨. 만약 할당하지 않으면 안 되겠네?
class IdolModel {
  name;
  year;

  constructor(name, year) {
    this.name = name;
    this.year = year;
  }

  sayName() {
    return `안녕하세요. ${this.name} 입니다.`;
  }
}

const yujin = new IdolModel("안유진", 2008);
const guli = new IdolModel("굴리", 2008);
const angel = new IdolModel("엔젤", 2008);
console.log(yujin.sayName());
console.log(guli.sayName());
console.log(angel.sayName());

console.log(typeof IdolModel);
console.log(typeof yujin);

// private 선언 -> getter, setter 가 필요
class IdomModel2 {
  #name; // private 로 선언
  year;

  constructor(name, year) {
    this.#name = name;
    this.year = year;
  }
}

const yujin2 = new IdomModel2("안유진", 2003);
console.log(yujin2);

