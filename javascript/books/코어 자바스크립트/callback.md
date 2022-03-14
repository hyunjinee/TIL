# callback function

콜백 함수는 다른 코드의 인자로 넘겨주는 함수입니다.

콜백 함수는 제어권과 관련이 깊습니다.

callback은 부르다 호출하다의 의미인 call과 뒤돌아오다, 되돌다 라는의미의 back의 합성어로, 되돌아 호출해달라는 명령입니다. 어떤 함수 X를 호출하면서 특정조건일 때 함수 Y를 실행해서 나에게 알려달라는 요청을 함께 보내는 것입니다. 이 요청을 받은 함수 X의 입장에서는 해당 조건이 갖춰졌는지 여부를 스스로 판단하고 Y를 직접 호출합니다.

이처럼 콜백함수는 다른 코드에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수입니다. 콜백함수를 위임 받은 코드는 자체적인 내부 로직에 의해 이 콜백함수를 적절한 시점에 실행합니다.

콜백함수 예제를 보겠습니다.

```tsx
const newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index);
  return currentValue + 5;
});
console.log(newArr);
```

map 메서드는 다음과 같은 구조로 이뤄져 있습니다.

```tsx
Array.prototype.map(calback[, thisArg])
callback: function (currentValue, index, array)
```

map메서드는 첫번째 인자로 callback함수를 받고, 생략 가능한 두번째 인자로 콜백함수 내부에서 this로 인식할 대상을 특정할 수 있습니다. thisArg를 생략할 경우에는 일반적인 함수와 마찬가지로 전역 객체가 바인딩됩니다.

map메서드는 배열의 모든 요소들을 처음부터 끝까지 하나씩 꺼내어 콜백함수를 반복호출하고 콜백 함수의 실행 결과들을 모아 새로운 배열을 만듭니다. 콜백함수의 첫번째 인자는 배열의 요소중 현재 값이, 두번째 인자에는 현재값의 인덱스가, 세번째 인자에는 map메서드의 대상이되는 배열 자체가 담깁니다.

map 메서드를 호출해서 원하는 배열을 얻으려면 map 메서드에 정의된 규칙에 따라 함수를 작성해야합니다.

map 메서드에 정의된 규칙에는 콜백함수의 인자로 넘어올 값들 및 그 순서도 포함돼 있습니다. 콜백함수를 호출하는 주체가 사용자가 아니라 map메서드이므로 map 메서드가 콜백함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인가 전적으로 map 메서드에게 달린 것 입니다. 이처럼 콜백함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길것인지에 대한 제어권을 가집니다.

## this

콜백함수도 함수이기 때문에 기본적으로 this가 전역객체를 참조하지만 제어권을 넘겨받을 코드에서 콜백함수에 별도로 this가 될 대상을 지정한 경우에는 그대상을 참조하게 됩니다.

map 메서드를 구현해봅시다.

```tsx
Array.prototype.map = function (callback, thisArg) {
  let mappedArr = [];
  for (let i = 0; i < this.length; i++) {
    let mappedValue = callback.call(thisArg || window, this[i], i, this);
    mappedArr[i] = mappedValue;
  }
  return mappedArr;
};
```

메서드 구현의 핵심은 call/apply 에 있습니다. this에는 thisArg 값이 있을 경우에는 그 값을, 없을 경우에는 전역 객체를 지정하고, 첫번째 인자에는 메서드의 this가 배열을 가리킬 것이므로 배열의 i번째 요소 값을 두 번째 인자에는 i값을 , 세번째 인자에는 배열 자체를 지정해 호출합니다. 그 결과가 변수 mappedValue 에 담겨 mappedArr 의 i 번째 인자에 할당됩니다. this를 넘기는 이유는 제어권을 넘겨받을 코드에서 첫번째 인자에 콜백함수 내부에서의 this가 될 대상을 명시적으로 바인딩하기 때문입니다.

```tsx
[(1, 2, 3, 4, 5)].forEach(function (x) {
  console.log(this); //window
});

setTimeout(function () {
  console.log(this); //window
}, 300);

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector("#a").addEventListener("click", function (e) {
  console.log(this, e);
}); //button ,mouseevent
```

forEach는 별도의 인자로 this를 받는 경우에만 this를 바인딩해주고 this를 넘겨주지 않으면 콜백함수내부의 this는 전역 객체를 가리킵니다. (그냥 함수로써실행)

setTimeout 내부에서 콜백함수를 호출할 때 call메서드의 첫번째 인자에 전역객체를 넘기기 때문에 콜백함수 내부에서 this가 전역 객체를 가리킵니다.

addEventListener는 내부에서 콜백함수를 호출할 때 call 메서드의 첫번째 인자에 addEventListener 메서드의 this를 그대로 넘기도록 정의돼 있기 때문에 콜백함수 내부에서의 this가 addEventListener를 호출한 주체인 HTML 엘리먼트를 가리키게 됩니다.

## 콜백함수는 함수다

콜백함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로서 호출됩니다.

```jsx
const obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i);
  },
};
obj
  .logValues(1, 2) // obj
  [(4, 5, 6)].forEach(obj.logValues); // window 4 0  window 5 1 window 6 2
```

obj 객체의 logValues는 메서드로 정의됐습니다.

이 메서드를 forEach함수의 콜백함수로서 전댈했습니다. obj를 this로 하는 메서드를 그대로 전달한 것이 아니라, obj.logValues 가 가리키는 함수만 전달한 것입니다. 이 함수는 메서드로서 호출할 때가 아닌 한 obj와 직접적인 연관이 없어집니다. forEach 에 의해 콜백이 함수로서 호출되고, 별도로 this를 지정하는 인자를 지정하지 않았으므로 함수 내부에서의 this는 전역 객체를 바라보게 됩니다.

결론: 함수의 인자에 객체의 메서드를 전달해도 이는 결국 메서드가 아닌 함수일 뿐이다. 이 차이를 정확하게 인지해야한다.

## 콜백 함수 내부의 this에 다른 값 바인딩하기

별도의 인자로 this를 받는 함수의 경우에는 여기에 원하는 값을 넘겨주면 되지만 그렇지 않은 경우에는 this의 제어권도 넘겨주게 되므로 사용자가 임의로 바꿀 수 없습니다. 그래서 전통적으로는 this를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 this대신 그 변수를 사용하게 하고, 이를 클로저로 만드는 방식이 많이 쓰였습니다.

다음은 콜백함수 내부의 this에 다른 값을 바인딩하는 전통적인 방식입니다.

```jsx
const obj1 = {
  name: "obj1",
  func: function () {
    let self = this;
    return function () {
      console.log(self.name);
    };
  },
};

let callback = obj1.func();
setTimeout(callback, 1000);
```

obj1.func 메서드 내부에서 self변수에 this를 담고 익명함수를 선언과 동시에 반환했습니다. obj1.func를 호출하면서 앞서 선언한 내부함수가 반환되어 callback 변수에 담깁니다.

이제는 어떻게하나요? bind

```jsx
const obj1 = {
  name: "obj1",
  func: function () {
    console.log(this.name);
  },
};

setTimeout(obj1.func.bind(obj1), 1000);
const obj2 = { name: "obj2" };
setTimeout(obj1.func.bind(obj2), 1500);
```

## 콜백 지옥과 비동기 제어

콜백 지옥은 콜백함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상으로, 자바스크립트에서 흔히 발생하는 문제입니다. 주로 이벤트 처리나 서버 통신과 같이 비동기적인 작엊ㅂ을 수행하기 위해 이런 형태가 자주 등장하곤 하는데, 가독성이 떨어질뿐더러 코드를 수정하기도 어렵습니다.

동기적인 코드는 현재 실행중인 코드가 완료된 후에야 다음 코드를 실행합니다. 반대로 비동기적인 코드는 현재 실행중인 코드의 완료 여부와 무관하게 다음 코드로 넘어갑니다. CPU계산에 의해 즉시 처리가 가능한 대부분의 코드는 동기적인 코드입니다. 계산식이 복잡해서 CPU가 계산하는데 시간이 많이 필요한 경우도 동기적인 코드입니다. 반면에 사용자의 요청에 의해 특정 시간이 경과되기 전까지 어떤 함수의 실행을 보류해야한다거나, 사용자의 직접적인 개입이 있을 때 비로서 어떤 함수를 실행하도록 대기한다거나, 웹브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 그에 대한 응답이 왔을 때 비로서 어떤 함수를 실행하도록 대기하는 등 별도의 요청, 실행대기, 보류 등과 관련된 코드는 비동기적인 코드입니다.

```jsx
setTimeout(
  function (name) {
    let coffeeList = name;
    console.log(coffeeList);
    setTimeout(
      function (name) {
        console.log((coffeeList += ", " + name));
        setTimeout(
          function (name) {
            coffeeList += "," + name;
            console.log(coffeeList);
            setTimeout(
              function (name) {
                coffeeList += ", " + name;
                console.log(coffeeList);
              },
              500,
              "카페라떼"
            );
          },
          500,
          "카페모카"
        );
      },
      500,
      "아메리카노"
    );
  },
  500,
  "아인슈페너"
);

//아인슈페너
//아인슈페너, 아메리카노
//아인슈페너, 아메리카노,카페모카
//아인슈페너, 아메리카노,카페모카, 카페라떼
```

가독성과 어색한 문제를 동시에 해결하는 방법은 익명의 콜백함수를 모두 기명함수로 전환하는 것입니다.

```jsx
let coffeeList = "";
const addEspresso = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, "아메리카노");
};
const addAmericano = function (name) {
  coffeeList += ", " + name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, "카페 모카");
};
const addMocha = function (name) {
  coffeeList += ", " + name;
  console.log(coffeeList);
  setTimeout(addLatte, 500, "카페라떼");
};
const addLatte = function (name) {
  coffeeList += ", " + name;
  console.log(coffeeList);
};
setTimeout(addEspresso, 500, "에스프레소");
```

위 코드는 가독성을 높일 뿐 아니라 함수 선언과 함수 호출만 구분할 수 있다면 위에서부터 아래로 순서대로 읽어내려가는데 어려움이 없습니다. 또한 변수를 최상단으로 끌어올림으로써 외부에 노출되게 됐지만 전체를 즉시 실행 함수 등으로 감싸면 간단히 해결됩니다.

```jsx
new Promise(function (resolve) {
  setTimeout(function () {
    let name = "espresso";
    console.log(name);
    resolve(name);
  }, 500);
})
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let name = prevName + ", 아메리카노";
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let name = prevName + " , 카페라떼";
        console.log(name);
        resolve(name);
      }, 500);
    });
  });
```

new 연산자와 함께 호출한 Promise의 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행되지만 그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지는 다음(then) 또는 오류 구문으로 넘어가지 않습니다. 따라서 비동기 작업이 완료될 때 비로서 resolve 또는 reject 를 호출하는 방법으로 비동기 작업의 동기적 표현이 가능합니다.

```jsx
const addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let newName = prevName ? prevName + ", " + name : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};

addCoffee("에스프레소")().then(addCoffee("아메리카노")).then(addCoffee("카페라떼")).then(addCoffee("카푸치노"));
```

```jsx
const addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ", " + name : name);
  }, 500);
};

const coffeeGenerator = function* () {
  let espresso = yield addCoffee("", "에스프레소");
  console.log(espresso);
  let americano = yield addCoffee(espresso, "아메리카노");
  console.log(americano);
  let mocha = yield addCoffee(americano, "모카");
  console.log(mocha);
  let latte = yield addCoffee(mocha, "라떼");
  console.log(latte);
};
const coffeeMaker = coffeeGenerator();
coffeeMaker.next();

에스프레소;
에스프레소, 아메리카노;
에스프레소, 아메리카노, 모카;
에스프레소, 아메리카노, 모카, 라떼;
```

제너레이터를 실행하면 Iterator가 반환되는데, Iterator는 next라는 메서드를 가지고 있습니다. 이 next 메서드를 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 yield에서 실행을 멈춥니다. 이후 다시 next 메서드를 호출하면 앞서 멈췄던 부분부터 시작해서 그다음에 등장하는 yield 함수의 실행을 멈춥니다. 그러니까 비동기 작업이 완료되는 시점마다 next 메서드를 호출해준다면, Generator 함수 내부의 소스가 위에서부터 아래로 순차적으로 진행됩니다.

```jsx
const addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 500);
  });
};

const coffeeMaker = async function () {
  let coffeeList = "";
  let _addCoffee = async function (name) {
    coffeeList += (coffeeList ? ", " : "") + (await addCoffee(name));
  };
  await _addCoffee("coffee1");
  console.log(coffeeList);
  await _addCoffee("coffee2");
  console.log(coffeeList);
  await _addCoffee("coffee3");
  console.log(coffeeList);
};

coffeeMaker();
```

ES2017 에서는 가독성이 뛰어나면서 작성법도 간단한 새로운 기능이 추가됐는데, async / await 입니다. 비동기 작업을 수행하고자 하는 함수 앞에 async 를표기하고, 함수 내부에서 실질적인 비동기 작업이 필요한 위치마다 await를 표기하는 것만으로 뒤의 내용을 Promsie로 자동 전환하고(async , await 은 무조건 Promise를 반환), 해당 내용이 resolve 된 이후에야 다음으로 진행합니다.

즉 Promise 의 then과 비슷한 효과를 낼 수 있습니다.

## 정리

- 콜백 함수는 다른 코드에 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수이다.
- 제어권을 넘겨받은 코드는 다음과 같은 제어권을 가진다.
  - 콜백함수를 호출하는 시점을 스스로 판단해서 실행한다.
  - 콜백 함수를 호출할 때 인자로 넘겨줄 값들 및 그 순서가 정해져 있다. 이 순서를 따르지 않고 코드를 작성하면 이상한 결과가 나온다.
  - 콜백 함수의 this가 무엇을 바라보도록 할지가 정해져 있는 경우도있습니다. 정하지 않은 경우에는 전역 객체를 바라봅니다. 사용자임의로 this를 바꾸고 싶을 경우, bind 메서드를 활용하면 됩니다.
  - 어떤 함수에 인자로 메서드를 전달하더라도 이는 함수로서 실행된다.
  ```jsx
  const obj = {
    vals: [1, 2, 3],
    logValues: function (v, i) {
      console.log(this, v, i)
    },
  }
  obj.logValues(1,2) // obj
  [4,5,6].forEach(obj.logValues) // window 4 0  window 5 1 window 6 2

  obj를 this로 하는 메서드를 그대로 전달한 것이 아니라, obj.logValues 가 가리키는 함수만 전달한 것입니다.
  obj.logValues()를 이렇게 실행한게 아니잖아. -> 실행했으면 obj의 메서드로 동작하니까 this가 obj겠지.
  이 함수는 메서드로서 호출할 때가 아닌 한 obj와 직접적인 연관이 없어집니다.
  forEach 에 의해 콜백이 함수로서 호출되고, 별도로 this를 지정하는 인자를 지정하지 않았으므로
  함수 내부에서의 this는 전역 객체를 바라보게 됩니다.
  ```
  - 비동기 제어를 위해 콜백 함수를 사용하다 보면 콜백지옥에 빠지기 쉬운데, ECMAScript 에는 Promise, Generator, async/await 등 콜백 지옥에서 벗어날 수 있는 훌륭한 방법들이 있다.
