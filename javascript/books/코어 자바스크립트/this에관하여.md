# JavaScript this 에 관하여

대부분의 객체지향 언어에서 this는 클래스로 생성한 인스턴스 객체를 의미합니다. 또한 클래스에서만 사용할 수 있기 때문에 혼란의 여지가 맣지 않습니다.

JavaScript에서는요? 아닙니다.

this는 어디서든 사용가능합니다. 상황에 따라 this가 바라보는 대상이 달라지는데, 어떤 이유로 그렇게 되는지를 파악하기 힘든 경우도 있고 예상과 다르게 엉뚱한 대상을 바라보는 경우도 존재합니다.

this의 정확한 작동 방식을 알지 못한다면 코드를 읽을 수 없습니다.

함수와 객체의 구분이 느슨한 자바스크립트에서는 this는 실질적으로 이 둘을 구분하는 거의 유일한 기능입니다.

JavaScript에서 this는 실행 컨텍스트가 생성될 때 함께 결정됩니다.

실행 컨텍스트는 함수를 호출할 때 생성되므로, 바꿔 말하면 this는 함수를 호출할 때 결정된다고 할 수 있습니다. 함수를 어떤 방식으로 호출하느냐에따라 값이달라지는 것 입니다.

전역 공간에서 this는 전역 객체를 가르킵니다. 개념상 전역 컨텍스트를 생성하는 주체가 바로 전역 객체이기 때문입니다. 전역 변수를 선언하면 자바스크립트 엔진은 이를 전역 객체의 프로퍼티로 할당합니다. 변수이면서 객체의 프로퍼티이기도 한 셈이죠.

```tsx
let a = 1;
console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); //1
```

위와 같이 동작하는 이유가 뭘까요? → **자바스크립트의 모든 변수는 특정 객체의 프로퍼티로서 동작하기 때문입니다.**

여기서 특정 객체란 바로 실행 컨텍스트의 LexicalEnvrionment(L.E) 입니다. 실행 컨텍스트는 변수를 수집해서 L.E 의 프로퍼티로 저장합니다. 이후 어떤 변수를 호출하면 L.E를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환합니다. 전역 컨텍스트의 경우 L.E는 전역 객체를 그대로 참조합니다.

**전역 변수를 선언하면 자바스크립트 엔진은 이를 전역 객체의 프로퍼티로 할당한다.**

### 메서드로서 호출할 때 그 메서드 내부에서의 this

프로그래밍 언어에서 함수와 메서드는 미리 정의한 동작을 수행하는 코드 뭉치로, 이둘을 구분하는 유일한 차이는 독립성에 있습니다. 함수는 그 자체로 독립적인 기능을 수행하는 반면 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행합니다. JavaScript는 상황별로 this키워드에 다른 값을 부여함으로써 이를 구현했습니다.

**this에는 호출한 주체에 대한 정보가 담깁니다.** 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 바로 함수명(프로퍼티명) 앞의 객체입니다. 점 표기법의 경우 마지막 점 앞에 명시된 객체가 곧 this가 되는 것 입니다.

```jsx
const obj = {
	methodA: function () {console.log(this);}
	inner : {
		methodB : function() {console.log(this);}
	}
}
obj.methodA() // obj
obj['mehtodA'](); // obj
obj.inner.methodB() // obj.inner
obj.inner['methodB']() // obj.inner
obj['inner'].methodB() // obj.inner
obj['inner']['methodB']() // obj.inner
```

어떤 함수를 함수로서 호출할 경우에는 this가 지정되지 않습니다. this에는 호출한 주체에 대한 정보가 담깁니다. 그런데 함수로서 호출하는 것은 호출 주체(객체 지향언어에서의 객체)를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알 수 없는 것 입니다.

실행 컨텍스트를 활성화 할 때에 this가 지정되지 않은 경우 this는 전역 객체를 바라봅니다. 함수에서의 this는 전역 객체를 가리킵니다. 더글라스 크락포드는 이를 명백한 설계상의 오류라고 지적합니다.

함수를 메서드로서 호출할 때와 함수로서 호출할 때 this는 다릅니다. 내부에 존재하는 함수 역시 이를 함수로서 호출했는지 메서드로서 호출했는지 파악하면 this값을 명확하게 찾을 수 있습니다.

```jsx
let obj1 = {
  outer: function () {
    console.log(this); // obj1
    let innerFunc = function () {
      console.log(this);
    };
    innerFunc(); // 그냥 함수로서 호출 this -> window
    let obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); // obj2
  },
};

obj1.outer();
```

함수로서 호출한것인가 어떤 객체의 메서드로서 호출한 것이냐에 따라 this 바인딩이 달라진다. 함수로서 호출하면 스코프 체인상의 최상위 객체인 전역객체가 바인딩 됩니다.

this바인딩에 관해서는 함수를 실행하는 당시의 주변환경 (메서드 내부인지, 함수 내부인지) 는 중요하지 않고 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건입니다.

ES6 에서는 함수 내부에서 this가 전역 객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 화살표 함수를 새로 도입했습니다. 화살표함수는 실행 컨텍스트를 생성할 때 this바인딩 과정 자체가 빠지게 되어 상위 스코프의 this를 그대로 활용할 수 있습니다. this 바인딩이 안되니까 스코프 체이닝에 따라서 상위 스코프의 this를 따르는구나...!

```jsx
let obj = {
  outer: function () {
    console.log(this); // { outer: f; }
    let innerFunc = () => {
      console.log(this); // {outer: f}
    };
    innerFunc();
  },
};
obj.outer();
```

### 콜백 함수 호출 시 그 함수 내부에서의 this

함수 A의 제어권을 다른 함수(또는 메서드) B에게 넘겨주는 경우 함수 A를 콜백함수라고합니다. 이때 함수 A는 함수 B의 내부 로직에 따라 실행되며, this 역시 함수 B내부 로직에서 정한 규칙에 따라 값이 결정됩니다. 콜백함수도 함수이기 때문에 기본적으로 this가 전역 객체를 참조하지만, 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조하게 됩니다.

```jsx
setTimeout(function () {
  console.log(this); // window
}, 300);

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this, x); // window
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector("#a").addEventListener("click", function (e) {
  console.log(this, e); // this -> #a 요소
});
```

마지막 예제에서 버튼을 클릭하면 앞서 지정한 엘리먼트와 클릭 이벤트에 관한 정보가 담긴 객체가 출력됩니다. addEventListener 메서드는 콜백함수를 호출할 때 자신의 this를 상속하도록 정의돼 있습니다. 그러니까 메서드명의 점(.) 앞부분이 곧 this가 됩니다.

이처럼 콜백함수에서 this는 무조건 무엇이다라고 말할 수 없습니다.

콜백함수의 제어권을 가지는 함수가 콜백함수에서의 this를 무엇으로 할지를 결정하, 특별히 정의하지 않은 경우에 기본적으로 함수와 마찬가지로 전역 객체를 바라봅니다.

### 생성자 함수 내부에서의 this

생성자 함수는 어떤 공통된 성질을 지니는 객체들을 생성하는데 사용하는 함수입니다.

자바스크립트는 함수에 생성자로서의 역할을 함께 부여했습니다. new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작합니다.

어떤 함수가 생성자 함수로서 호출된 경우 내부에서의 this는 곧 새로 만들 구체적인 인스턴스 자신이 됩니다.

## 명시적으로 this를 binding 하는 방법

바인딩 규칙을 깨고 this에 별도의 바인딩 대상을 정하는 방법도 존재합니다.

### call

```jsx
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

call 메서드는 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령입니다. 이때 call메서드의 첫번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 합니다. 함수를 그냥 실행하면 this는 전역 객체를 참조하지만 call 메서드를 이용하면 임의의 객체를 this로 지정할 수 있습니다.

```jsx
let func = function (a, b, c) {
  console.log(this, a, b, c);
};
func(1, 2, 3); // window 1 2 3
func.call({ x: 1 }, 4, 5, 6); // {x:1}  4 5 6
```

메서드에 대해서도 마찬가지로 객체의 메서드를 그냥 호출하면 this는 객체를 참조하지만 call메서드를 이용하면 임의의 객체를 this로 지정할 수 있습니다.

```jsx
let obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.method(2, 3); // 1 2 3
obj.method.call({ a: 4 }, 5, 6); // 4 5 6
```

### apply

```jsx
Function.prototype.apply(thisArg[, argsArray])
```

apply 는 call메서드와 기능적으로 동일합니다. call 메서드는 첫번째 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정하는 반면, apply 메서드는 두번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 점에서 차이가 있습니다.

```jsx
const func = function (a, b, c) {
  coonsole.log(this, a, b, c);
};
const func = function (a, b, c) {
  console.log(this, a, b, c);
};

func.apply({ x: 1 }, [4, 5, 6]); // { x: 1 } 4 5 6
const obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.method.apply({ a: 4 }, [5, 6]);
```

```jsx
const obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

Array.prototype.push.call(obj, "d");
console.log(obj); // {0: "a", 1: "b", 2: "c", 3: "d", length: 4}

const arr = Array.prototype.slice.call(obj);
console.log(arr); // ["a", "b", "c", "d"]
```

객체에는 배열 메서드를 직접 적용할 수 없습니다. 그러나 키가 0또는 양의 정수인 프로퍼티가 존재하고 length 프로퍼티 값이 0 또는 양의 정수인 객체, 즉 배열의 구조와 유사한 객체인 경우(유사배열 객체) call또는 apply를 이용해 배열 메서드를 차용할 수 있습니다.

slice 메서드는 원래 시작 인덱스값과 마지막 인덱스 값을 받아 시작값부터 마지막 값의 앞부분까지 배열 요소를 추출하는 메서드인데, 매개변수를 아무것도 넘기지 않을 경우에는 그냥 원본 배열의 얕은 복사본을 반환합니다. 그러니까 call메서드를 이용해 원본인 유사배열 객체의 얕은 복사를 수행한 것인데, slice 메서드가 배열 메서드이기 때문에 복사본은 배열로 반환하게 된 것입니다.

**함수 내부에서 접근할 수 있는 arguments 객체도 유사 배열 객체이므로 위의 방법으로 배열로 전환해서 활용할 수 있습니다. querySelectorAll, getElementsByClassName 등의 Node 선택자로 선택한 결과인 NodeList도 마찬가지입니다.**

```jsx
function a() {
  let argv = Array.prototype.slice.call(arguments);
  argv.forEach((arg) => console.log(arg));
}
//1
//2
//3

a(1, 2, 3);

document.body.innerHTML = "<div>a</div><div>b</div><div>c</div>";
let nodeList = document.querySelectorAll("div");
let nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach((node) => console.log(node));
// <div>a</div>
// <div>b</div>
// <div>c</div>
```

그 밖에도 유사배열객체에는 call/apply메서드를 이용해 모든 배열 메서드를 적용할 수 있습니다. 배열처럼 인덱스나 length프로퍼티를 지니는 문자열에 대해서도 마찬가지입니다. 단 문자열의 경우 length프로퍼티가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 메서드 (push, pop, shift, unshift, splice) 는 에러를 던지며, concat처럼 대상이 반드시 배열이어야 하는 경우에는 에러는 나지 않지만 제대로된 결과를 얻을 수 없습니다.

```jsx
유사배열 객체를 기억하고 가자!!!
```

```jsx
let str = "abc def";
Array.prototype.push.call(str, ", pushed string");
// Error: cannot assign to read only property 'lenght' of object [object String]
Array.prototype.concat.call(str, "string"); // [String {"abc def", "string"}]
Array.prototype.every.call(str, function (char) {
  return cahr !== " ";
}); // false
Array.prototype.some.call(str, function (char) {
  return char === " ";
}); // true
let newArr = Array.prototype.map.call(str, function (char) {
  return char + "!";
});
// ['a!' , 'b!', ... 'f!']
let newStr = Array.prototype.reduce.apply(str, [
  function (string, char, i) {
    return string + char + i;
  },
  "",
]);
// 'a0b1c2 3d4e5f6'
```

**call/apply를 이용해 형변환하는 것은 this를 원하는 값으로 지정해서 호출한다라는 본래의 메서드의 의도와는 다소 동떨어진 활용법이라고 할 수 있습니다. slice 메서드는 오직 배열 형태로 ‘복사'하기 위해 차용됐을 뿐이니, 경험을 통해 숨은 뜻을 알고 있는 사람이 아닌 한 코드만 봐서는 어떤 의도인지 파악하기 어렵습니다. 이에 ES6 에서는 유사배열 객체 또는 순회가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from 메서드를 도입합니다.**

```jsx
let obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

let arr = Array.from(obj);
console.log(arr); // ["a", "b", "c"]
```

call/apply 메서드는 명시적으로 별도의 this를 바인딩하면서 함수또는 메서드를 실행하는훌륭한 방법이지만 오히려 이로 인해 this를 예측하기 어렵게 만들어 코드 해석을 방해한다는 단점이 존재합니다.

### bind 메서드

```jsx
Function.prototype.bind(thisArg[, arg1[,arg2[, ... ]]] )
```

bind는 ES5에 추가된 기능으로 call과 비슷하지만 즉시 호출하지는 않고 넘겨받은 this및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드입니다. 다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind메서드를 호출했을 때 전달했던 인수들의 뒤에 이어서 등록됩니다. 즉 bind메서드는 함수에 this를 미리 적용하는 것과 부분적용함수를 구현하는 두가지 목적을 모두 지닙니다.

```jsx
const func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};

func(1, 2, 3, 4);
const bindFunc = func.bind({ x: 1 });
bindFunc(5, 6, 7, 8);
const bindFunc2 = func.bind({ x: 1 }, 4, 5);
bindFunc2(6, 7); // {x:1} 4 5 6 7
bindFunc2(8, 9); // {x:1} 4 5 8 9
```

name 프로퍼티

bind메서드를 적용해서 새로 만든 함수는 한가지 독특한 성질을 갖습니다. 바로 name 프로퍼티에 동사 bind의 수동태인 bound라는 접두어가 붙는다는 점입니다. 어떤 함수의 name프로퍼티가 bound xxx 이라면 이는 곧 함수명이 xxx인 원본함수에 bind메서드를 적용한 새로운 함수라는 의미가 되므로 기존의 call 이나 apply 보다 코드를 추적하기에 더 수월해진면이 존재합니다.

```jsx
const func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};

const bindFunc = func.bind({ x: 1 }, 4, 5);
console.log(func.name); // func
console.log(bindFunc.name); // bindFunc
```

call, apply연습

```tsx
const obj = {
  outer: function () {
    console.log(this); // obj
    const innerFunc = function () {
      console.log(this);
    };
    innerFunc.call(this); // obj
  },
};

obj.outer();
```

```tsx
const obj = {
  outer: function () {
    console.log(this); // obj
    const innerFunc = function () {
      console.log(this);
    }.bind(this);
    innerFunc(); // obj
  },
};
obj.outer();
```

```tsx
const obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500);
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000);
  },
};

obj.logThisLater1(); // window
obj.logThisLater2(); // obj
```

### 화살표 함수의 예외사항

화살표함수는 실행컨텍스트 생성시 this 바인딩 과정이 없다. 즉 이함수 내부에는 this가 아예 없으며 접근하고자 하면 스코프체인상 가장 가까운 this에 접근한다.

```tsx
const obj = {
  outer: function () {
    console.log(this);
    const innerFunc = () => {
      console.log(this);
    };
    innerFunc();
  },
};
obj.outer(); // {outer: ƒ} * 2
```

### 콜백함수 내에서의 this

콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this를 지정할객체(thisArg)를 인자로 지정할 수 있는 경우가 있습니다. 이러한 메서드의 thisArg 값을 지정하면 콜백 함수 내부에서 this 값을 원하는 대로 변경할 수 있습니다. 이런 형태는 여러 내부 요소에 대해 같은 동작을 반복 수행해야 하는 배열 메서드에 많이 포진돼 있으며, 같은 이유로 ES6에서 새로 등장한 Set, Map등의 메서드에도 일부 존재합니다. 그중 대표적인 배열 메서드인 forEach를 살펴봅시다.

```tsx
const report = {
  sum: 0,
  count: 0,
  add: function () {
    const args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this); // 요기가 중요
  },
  average: function () {
    return this.sum / this.count;
  },
};
report.add(60, 85, 95);
console.log(report.sum, report.count, report.average());
```

## 정리

- 전역 공간에서 this는 전역객체를 참조한다.
- 어떤 함수를 메서드로서 호출한 경우 this는 메서드 호출 주체를 참조한다.
- 어떤 함수를 함수로서 호출한 경우 this는 전역 객체를 참조한다. 메서드의 내부함수에서도 마찬가지이다.
- 콜백 함수 내부에서의 this는 해당 콜백함수의 제어권을 넘겨받은 함수가 정의한 바에 따르며 정의하지 않은 경우에는 전역 객체를 참조한다.
- 생성자 함수에서의 this는 생성될 인스턴스를 참조한다.
- call, apply 메서드는 this를 명시적으로 지정하면서 함수또는 메서드를 호출한다.
- bind 메서드는 this및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다. (부분 적용함수)
- 요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 한다.
