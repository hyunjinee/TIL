# this binding

**this 는 현재 실행되는 코드의 실행 컨텍스트를 말합니다.** node 환경에서는 global 객체, browser 환경에서는 window 객체를 가리킵니다.

일반적인 함수 내부에서 this를 호출하면 전역 객체를 가리킵니다. 만약 함수 내부 또는 외부에서 strict모드를 사용한다면 this는 전역 객체를 바인딩 하지 않습니다.

```javascript
function checkThisInNormalFunc() {
  "use strict";
  console.log(this === window); // false
}
checkThisInNormalFunc();
console.log(this === window); // true
```

함수 외부

```javascript
"use strict";
function checkThisInNormalFunc() {
  console.log(this === window); // false
}
function checkThisInNormalFunc2() {
  console.log(this === window); // false
}
checkThisInNormalFunc();
checkThisInNormalFunc2();
console.log(this === window); // true
```

즉시 실행 함수 내부의 this binding

```javascript
(function(){
 console.log(this === window); // true
})();
---------------------------------------
'use strict';
(function(){
 console.log(this === window); // false
})();
```

객체 내부의 메소드에서 this를 binding 하는 경우 그 객체 자신을 가리키게 됩니다.

```javascript
var obj = {
  name: "seo",
  print: function () {
    console.log(this.name); // seo
    console.log(this === obj); // true
  },
};
obj.print();
```

this가 참조되는 위치가 중요한게 아니라 어디서, 어떻게 this를 포함하는 코드를 호출하느냐가 중요합니다.

```javascript
var obj1 = {
  name: "seo",
  print: function () {
    console.log(this.name); // this가 참조되는 위치
  },
};
var obj2 = { name: "jeong", print: obj1.print };
var name = "kuk";
var print = obj1.print;
print(); // kuk
obj1.print(); // seo
obj2.print(); // jeong
```

```javascript
var obj = {
  print: function () {
    console.log(this == obj);
  },
};
var print = obj.print;

obj.print(); // true
print(); // false
```

new 로 선언할 경우 this는 전역 객체가아닌 생성된 객체 자체를 가리키게 된다.

```javascript
function printName() {
  var lastName = "seo";
  this.firstName = "jeong kuk";
  console.log(this.lastName + " " + this.firstName);
}
var lastName = "kim";
printName(); // kim jeong kuk
var o = new printName(); // undefined jeong kuk
```

call과 apply 메소드는 첫번째 인자로 실행 컨텍스트를 인자로 전달합니다.printName.call(obj) 에서 obj를 전달할 때, this가 obj의 실행 컨텍스트를 가리키게 되므로 결과는 아래와 같습니다.

```javascript
function printName() {
  console.log(this.name);
}
var name = "seo";
printName(); // seo
var obj = { name: "jeong kuk" };
printName.call(obj); // jeong kuk
```

es6 에서 나온 arrow function 의 가장 큰 특징은 this가 binding 하는 대상이 달라지는 것입니다.

```javascript
var obj = {
  names: ["seo"],
  text: "님 안녕하세요",
  print: function () {
    console.log(this.text); //님 안녕하세요
    this.names.forEach(function (name) {
      console.log(name + this.text); // seoundefined
    });
  },
};
obj.print();
```

```javascript
var obj = {
  names: ["seo"],
  text: "님 안녕하세요",
  print: function () {
    console.log(this.text);
    this.names.forEach((name) => {
      console.log(name + this.text); // seo님 안녕하세요
    });
  },
};
obj.print();
```

결과가 다른이유는 arrow function 내부에서 this는 전역 객체가 아닌 부모 객체인 obj를 가리키기 때문입니다. 이를 lexical this 라고도 표현합니다.

화살표 함수를 사용해서는 안될 경우도 있습니다. 아래 코드에서 obj 객체의 print 메소드를 화살표 함수로 선언했습니다. 이 처럼 객체의 메소드를 화살표 함수로 선언할 경우 this는 전역 객체를 가리키므로 주의해야 합니다.

```javascript
var obj = {
  names: ["seo"],
  text: "님 안녕하세요",
  print: () => {
    console.log(this.text);
  }, // undefined
};
obj.print();
```

이 외에도 화살표 함수는 prototype 속성이 없으며 new 연산자로 생성 될 수 없다는 특징이 있습니다.

```javascript
var Name = () => {};
console.log(Name.prototype); // undefined
var name = new Name(); // TypeError: Name is not a constructor
```

결국 this binding 이라는 것은 실행되는 코드의 실행 컨텍스트를 binding한다고 생각하면 될 것 같다.

## 참고

- [javascript this binding 정리](https://medium.com/sjk5766/javascript-this-binding-%EC%A0%95%EB%A6%AC-ae84e2499962)
