class General {
  constructor() {
    console.log("인스턴스 생성됨");
  }
}

const a = new General(); // a변수를 만들고, 인스턴스를 생성한다.
const b = new General(); // b변수를 만들고, 인스턴스를 생성한다.
console.log(typeof General);
console.log(typeof a);
console.log(typeof b);
console.log(a === b);

class Singleton {
  // step 1 : 인스턴스를 저장할 정적변수
  // 
  static instance = null;

  constructor() {
    // step2 : 이미 인스턴스가 있으면, 반환 
    if(Singleton.instance){
        return Singleton.instance
    }

  }
}
