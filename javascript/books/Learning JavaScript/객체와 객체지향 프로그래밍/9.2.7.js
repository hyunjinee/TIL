class Super {
  constructor() {
    this.name = "Super";
    this.isSuper = true;
  }
}

Super.prototype.sneaky = "not recommended";

class Sub extends Super {
  constructor() {
    super();
    this.name = "Sub";
    this.isSub = true;
  }
}

const obj = new Sub();
for (let p in obj) {
  console.log(
    `${p}: ${obj[p]}` + (obj.hasOwnProperty(p) ? " yes" : " (inherited)")
  );
}
console.log(obj);
const sup = new Super();
console.log(sup.sneaky);
for (let prop in sup) {
  console.log(prop);
}
for (let a in sup) {
  console.log(typeof a);
  //string
  console.log(sup.hasOwnProperty(a) ? "yes" : "no");
}
console.log(Super.prototype);
console.log(Super.hasOwnProperty("sneaky") ? "yes" : "inherited");
console.log(sup.hasOwnProperty("sneaky") ? "yes" : "inherited");
//이걸보면 Super 클래스의 원형으로붙어 상속 받았다는 걸 알수 있네
// Super 클래스도 가지고 있는게 아니고 그 원형으로부터 inherited
console.log(Object.keys(sup));
for (let i in sup) {
  console.log(i);
}
//Object.keys 를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있다.
// 프로토 타입의 프로퍼티를 제외한 자기 본인만의 프로퍼티를 가져온다는 점에서 for in 과 다르다.
