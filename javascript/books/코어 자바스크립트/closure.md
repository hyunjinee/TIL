# closure

## 클로저의 의미 및 원리 이해

`클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.`

클로저는 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성입니다. 자바스크립트의 고유 개념이 아니라서 ECMAScript 명세에도 클로저의 정의를 다루지 않고 있고, 다양한 문헌에서 제각각 클로저를 다르게 정의 또는 설명하고 있습니다.

- 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수 - 더글라스 크록포드(자바스크립트 핵심 가이드)
- 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는것 - 에단 브라운 (러닝 자바스크립트)
- 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수 -존 레식(자바스크립트 닌자 비급)
- 이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수 - 송형주 고현준(인사이드 자바스크립트)
- 자유 변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합 - 에릭 프리먼(Head First JavaScript programming)
- 로컬 변수를 참조하고 있는 함수 내의 함수 - 야마다 요시히로(자바스크립트 마스터북)
- 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수 - 유인동 (함수형 자바스크립트 프로그래밍)

MDN 에서는 클로저에대해 `A closure is the combination of a function and the lexical environment within which that function was decalred`

라고 소개합니다. 직역하자면, 클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상 정도가 될 수 있습니다.

선언될 당시의 lexical environment는 실행 컨텍스트의 구성요소 중 하나인 outerEnvironmentReference에 해당합니다. LexicalEnvironment의 environmentRecord와 outerEnvironmentReference에 의해 변수의 유효범위인 스코프가 결정되고 스코프 체인이 가능해 집니다. 어떤 컨텍스트 A에서 선언한 내부함수 B의 실행 컨텍스트가 활성화된 시점에는 B의 outerEnvironmentReference가 참조하는 대상인 A의 LexicalEnvironment에도 접근이 가능합니다. A에서는 B에 선언한 변수에 접근할 수 없지만 B에서는 A에 선언한 변수에 접근 가능합니다.

내부함수 B가 A의 LexicalEnvironment를 언제나 사용하는 것은 아닙니다. 내부함수에서 외부 변수를 참조하지 않는 경우라면 combination이라고 할 수 없습니다. 내부함수에서 외부 변수를 참조하는 경우에 한해서만 combination, 즉 선언될 당시의 LexicalEnvironment와의 상호 관계가 의미가 있습니다.

클로저란 어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상이라고 볼 수 있습니다.

```jsx
const outer = function () {
  let a = 1;
  const inner = function () {
    console.log(++a);
  };
  inner();
};
outer();
```

outer에서 a를 선언했고, outer의 내부함수인 inner함수에서 a의 값을 1만큼 증가시킨 다음 출력합니다. inner 함수 내부에서는 a를 선언하지 않았기 때문에 environmentRecord에서 값을 찾지 못하므로 outerEnvironmentReference에 지정된 상위 컨텍스트인 outer의 LexicalEnvironment에 접근해서 a를 찾습니다. outer 함수의 실행 컨텍스트가 종료되면 LexicalEnvironment에 저장된 식별자들 (a, inner)에 대한 참조를 지웁니다. 그러면 각 주소에 저장돼 있던 값들은 자신을 참조하는 변수가 하나도 없게 되므로 가비지 컬렉터의 수집 대상이 됩니다.

```jsx
const outer = function () {
  let a = 1;
  const inner = function () {
    return ++a;
  };
  return inner();
};

const outer2 = outer();
console.log(outer2);
```

이번에도 inner함수 내부에서 외부변수인 a를 사용했습니다. inner함수를 실행한 결과를 리턴하고 있으므로 결과적으로 outer 함수의 실행컨텍스트가 종료된 시점에는 a변수를 참조하는 대상이 없어집니다. a, inner값은 가비지 컬렉터에 의해 소멸됩니다.

```jsx
const outer = function () {
  let a = 1;
  const inner = function () {
    return ++a;
  };
  return inner;
};

const outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

이번에는 함수 자체를 반환합니다. 이렇게되면 outer함수의 실행 컨텍스트가 종료될 때 outer2변수는 outer의 실행 결과인 inner함수를 참조하게 될 것 입니다.

inner함수의 실행 컨텍스트의 environmentRecord에는 수집할 정보가 없습니다. outerEnvironmentReference에는 inner함수가 선언된 위치의 LexicalEnvironment가 참조 복사됩니다. inner 함수는 outer 함수 내부에 선언됐으므로, outer 함수의 LexicalEnvironment가 담깁니다.이제 스코프 체이닝에 따라서 outer에 선언한 변수 a에 접근해서 1만큼 증가시킨 후 그 값인 2를 반환하고, inner 함수의 실행 컨텍스트가 종료됩니다. 그후 outer2를 한번도 호출하면 같은 방식으로 a의 값을 2에서3으로 1증가시킨후 3을 반환합니다. inner함수의 실행 시점에는 outer 함수는 이미 실행 종료된 상태인데 outer함수의 LexicalEnvironment에 어떻게 접근할 수 있는 걸까요? → 이는 가비지 컬렉터의 동작 방식 때문입니다. 가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 존재하면 그 값은 수집 대상에 포함시키지 않습니다.

외부 함수인 outer이 실행이 종료되더라도 내부함수인 inner 함수는 언젠가 outer2함수를 실행함으로써 호출될 가능성이 열립니다. 언젠가 inner함수의 실행 컨텍스트가 활성화되면 outerEnvironmentReference가 outer 함수의 LexicalEnvironment를 필요로 할 것이므로 수집 대상에서 제외합니다. 그 덕분에 inner함수가 이 변수에 접근할 수 있습니다.

어떤 함수의 outerEnvironmentReference는 실행 컨텍스트가 활성화될 때가 아니라 선언 시점에 미리정보를 수집해두는 것이 아닐까라는 추측이 논리적으로 타당해보입니다. 아쉽게도 이 추측을 보강해줄만한 근거를 발견하지 못했습니다. 원리가 어떻든 우리는 어떤 함수의 lexicalEnvironment가 이를 참조할 예정인 다른 실행 컨텍스트가 있는 한 실행 종료 이후에도 GC가 되지 않는다는 점만 기억하면 됩니다.

스펙상으로는 선언당시의 LexicalEnvironment 전부를 GC하지 않도록 돼 있으나 2019년 기준으로 크롬이나 Node.js 등에서 사용하는 V8엔진의 경우 내부함수에서 실제로 사용하는 변수만 남겨두고 나머지는 GC하도록 최적화돼 있습니다.

함수의 실행 컨텍스트가 종료된 후에도 LexicalEnviroment가 가비지 컬렉터의 수집 대상에서 제외되는 경우는 지역변수를 참조하는 내부함수가 외부로 전달된 경우가 유일합니다.

클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상을 말합니다.

외부로 함수를 전달한다는 것이 return만을 의미하는 것은 아닙니다.

```jsx
(function () {
  let a = 0;
  let intervalId = null;
  const inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```

```jsx
(function () {
  let a = 0;
  let intervalId = null;
  const inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```

두 상황모두 지역변수를 참조하는 내부함수를 외부에 전달 했기 때문에 클로저입니다.

다른책들에서 클로저를 함수라고 정의하는 부분이 살짝 아쉽다. → 통상적으로 클로저 현상이 발견되는 함수 자체를 클로저라고 칭하더라도 그 의미는 충분히 통하므로 틀렸다는 것은 아니지만, 개념상의 클로저와 의미론적으로 일치하는 실제적인 클로저가 무엇인지에 대해서는 한번쯤 생각해보면 좋겠다. 개념적으로 클로저는 어떤 상황에서만 발생하는 특수한 현상을 의미한다. 함수는 이현상이 나타나기 위한 조건에는 해당하지만 그 현상을 구체화한 대상으로는 볼 수 없다. 따라서 실제적인 클로저는 클로저 현상에 의해 메모리에 남겨진 변수들의 집합을 지칭하는 것으로 이해하는 것이 좀더 정확하다.

## 클로저와 메모리 관리

클로저는 객체지향과 함수형 모두를 아우르는 매우 중요한 개념입니다. 메모리 누수의 위험을 이유로 클로저 사용을 조심해야한다거나 심지어 지양해야한다고 주장하는 사람들도 있지만 메모리 소모는 클로저의 본질적인 특성일 뿐입니다. 오히려 이러한 특성을 정확하게 이해하고 잘 활용해야합니다. 메모리 누수는 개발자의 의도와 달리 어떤 값의 참조 카운트가 0이 되지 않아 GC의 수거 대상이 되지 않는 경우에 맞는 표현이지만 개발자가 의도적으로 참조 카운트가 0이되지 않게 설계한 경우는 누수라고 할 수 없습니다.

참조 카운트를 0으로 만드는 방법은 뭘까요? → 식별자에 참조형이 아닌 기본형 데이터(보통 null이나 undefined)를 할당하면 됩니다.

```jsx
const outer = (function () {
  let a = 1;

  const inner = function () {
    return ++a;
  };
  return inner;
})();
console.log(outer());
console.log(outer());
outer = null; // outer식별자에 inner함수 참조를 끊어버림
```

```jsx
(function () {
  let a = 0;
  let intervalId = null;
  const inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
      inner = null; // inner 식별자의 함수 참조를 끊음
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```

```jsx
(function () {
  let count = 0;
  const button = document.createElement("button");
  button.innerText = "Click me";
  const clickHandler = function () {
    console.log(++count, "times clicked");
    if (count >= 10) {
      button.removeEventListener("click", clickHandler);
      clickHandler = null; // clickHandler 식별자의 함수 참조를 끊어버림
    }
  };
  button.addEventListener("click", clickHandler);
  document.body.appendChild(button);
});
```

### 클로저 활용 사례

- 콜백함수 내부에서 외부 데이터를 사용하고자 할 때

```tsx
let fruites = ["apple", "banana", "peach"];
let $ul = document.createElement("ul");

fruites.forEach(function (fruit) {
  // A
  const $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", function () {
    alert("your choice is " + fruit); // B
  });
  $ul.appendChild($li);
});
document.body.appendChild($ul);
```

forEach 메서드에 넘겨준 익명의 콜백함수는 그 내부에서 외부 변수를 사용하지 않고 있으므로 클로저가 없지만 addEventListener에 넘겨준 콜백함수 (B)에는 fruit라는 외부변수를 참조하고 있으므로 클로저가 있습니다. A는 fruits 개수만큼 실행되며, 그때마다 새로운 실행 컨텍스트가 활성화 될 것입니다. A의 실행 종료 여부와 무관하게 클릭 이벤트에 의해 각 컨텍스트의 B가 실행될 때는 B의 outerEnviromentReferrence가 A의 LexicalEnvironment를 참조하게 됩니다. 따라서 최소한 B함수가 참조할 예정인 변수 fruit에 대해서는 A가 종료된 후에도 GC대상에서 제외되어 계속 참조 가능합니다.

```tsx
const alertFruitBuilder = function (fruit) {
  return function () {
    alert("your choice is " + fruit);
  };
};
fruites.forEach(function (fruit) {
  const $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
```

클릭이벤트가 발생하면 비로어 이 함수의 실행 컨텍스트가 열리면서 alertFruitBuilder 의 인자로 넘어온 fruit를 outerEnvironmentReference에 의해 참조할 수 있습니다. 즉 alertFruitBuilder의 실행 결과로 반환된 함수에는 클로저가 존재합니다.

- 접근 권한제어 (정보 은닉)

정보 은닉은 어떤 모듈 내부 로직에 대해 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자하는 현대 프로그래밍 언어의 중요한 개념입니다. 흔히 접근 권한에는 public, private, protected 세 종류가 있습니다.

자바스크립트는 기본적으로 변수 자체에 이러한 접근 권한을 직접 부여하도록 설계돼 있지 않습니다. 그렇다고 접근 권한 제어가 불가능 한 것은 아닙니다. 클로저를 이용하면 함수 차원에서 public한 값과 private한 값을 구분하는 것이 가능합니다.

```tsx
const outer = function () {
  let a = 1;
  const inner = function () {
    return ++a;
  };
  return inner;
};
const outer2 = outer();
console.log(outer2());
console.log(outer2());
```

outer함수를 종료할 때 inner함수를 반환함으로써 outer 함수의 지역변수인 a의 값을 외부에서도 읽을 수 있게 됐습니다. 이처럼 클로저를 활용하면 외부 스코프에서 함수 내부의 변수들 중 선택적으로 일부의 변수에 대한 접근 권한을 부여할 수 있습니다.

closure라는 단어는 사전적으로 닫혀있음, 폐쇄성 정도의 의미를 갖는데 이 폐쇄성에 주목해보면 위 예제를 조금 다르게 받아들일 수 있습니다. outer 함수는 외부로부터 철저하게 격리된 공간입니다. 외부에서는 외부 공간에 노출돼 있는 outer라는 변수를 통해 outer함수를 실행할 수는 있지만, outer함수 내부에는 어떠한 개입도 할 수 없습니다. 외부에서는 오직 outer함수가 return 한 정보에만 접근 할 수 있습니다. return 값이 외부에 정보를 제공하는 유일한 수단인 것이죠.

외부에 제공하고자 하는 정보를을 모아서 return하고, 내부에서만 사용할 정보들은 return 하지 않는 것으로 접근 권한 제어가 가능합니다.

아래는 클로저로 변수를 은닉한 예제입니다.

```tsx
const createCar = function () {
  const fuel = Math.ceil(Math.random() * 10 + 10);
  const power = Math.ceil(Math.random() * 3 + 2);
  let moved = 0;

  return {
    get moved() {
      return moved;
    },
    run: function () {
      let km = Math.ceil(Math.random * 6);
      let wasteFuel = km / power;
      if (fuel < wasteFuel) {
        console.log("이동 불가");
        return;
      }
      fuel -= wasteFuel;
      moved += km;
      console.log(`${km}km 이동, 이동한 거리: ${moved}km, 남은 연료: ${fuel}L`);
    },
  };
};

const car = createCar();
```

run 메서드를 외부에서 수정할 수는 있지만 변수를 은닉하는데 성공했습니다.

객체를 return 하기 전에 freeze시키면 변경할 수 없습니다.

```tsx
const createCar = function () {
  let publicMembers = {};
  Object.freeze(publicMembers);
  return publicMembers;
};
```

- 부분 적용 함수

부분 적용 함수(partially applied function)이란 n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가 나중에 (n-m)개의 인자를 넘기면 비로서 원래 함수의 실행 결과를 얻을 수 있게 하는 함수입니다. this를 바인딩해야 하는 점을 제외하면 앞서 살펴본 bind메서드의 실행 결과가 바로 부분적용 함수 입니다.

```tsx
const add = function () {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};
const addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10)); // 55
```

addPartial함수는 55를 미리 적용하고 추후 추가적으로 인자들을 전달하면 모든 인자를 모아서 원래의 함수가 실행되는 부분 적용함수입니다. add함수는 this를 사용하지 않으므로 bind 메서드만으로 문제 없이 구현가능합니다. 그러나 this의 값을 변경할 수 밖에 없기 때문에 메서드에서는 사용할 수 없을 것 같습니다.

```tsx
const partial = function () {
  const originalPartialArgs = arguments;
  const func = originalPartialArgs[0];

  if (typeof func !== "function") {
    throw new Error("첫 번째 인자가 함수가 아닙니다.");
  }
  return function () {
    const partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    const restArgs = Array.prototype.slice.call(arguments);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

const add = function () {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};

const addPartial = partial(add, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));

const dog = {
  name: "강아지",
  greet: partial(function (prefix, suffix) {
    return prefix + this.name + suffix;
  }, "왈왈"),
};

console.log(dog.greet("입니다."));
```

apply는 실행 시점의 this를 그대로 반영한다.

```tsx
Object.defineProperty(window, "_", {
  value: "EMPTY_SPACE",
  writable: false,
  configurable: false,
  enumerable: false,
});

const partial2 = function () {
  const originalPartialArgs = arguments;
  const func = originalPartialArgs[0];
  if (typeof func !== "function") {
    throw new Error("첫 번쨰 인자가 함수가 아닙니다.");
  }

  return function () {
    const partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    const restArgs = Array.prototype.slice.call(arguments);

    for (let i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        partialArgs[i] = restArgs.shift();
      }
    }
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

const add = function () {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};

const addPartial = partial2(add, 1, 2, _, 4, 5, _, _, 8, 9);
console.log(addPartial(3, 6, 7, 10));

const dog = {
  name: "강아지",
  greet: partial2(function (prefix, suffix) {
    return prefix + this.name + suffix;
  }, "왈왈"),
};

dog.greet("배고파요!");
```

실무에서 부분함수를 사용하기에 적합한 예로 `debounce` 가 있다. 디바운스는 짧은 시간동안 동일한 이벤트가 많이 발생할 경우 이를 전부 처리하지 않고 처음 또는 마지막에 발생한 이벤트에 대해 한번만 처리하는 것으로 프론트엔드 성능 최적화에 큰 도움을 주는 기능입니다.

```tsx
const debounce = function (eventName, func, wait) {
  let timeoutId = null;
  return function (event) {
    console.log(eventName, "event발생");
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(selt, event), wait);
  };
};

const moveHandler = function (e) {
  console.log("move event처리");
};

const wheelHandler = function (e) {
  console.log("wheel event처리");
};

document.body.addEventListener("mousemove", debounce("move", moveHandler, 500));
document.body.addEventListener("mousewheel", debounce("wheel", wheelHandler, 500));
```

wait 시간이 경과하기 전에 다시 동일한 event가 발생하면 앞에서 저장했던 대기열을 초기화하고 다시 새로운 대기열을 등록합니다. 결국 각 이벤트가 바로 이전 이벤트로부터 wait시간 이내에 발생하는 한 마지막에 발생한 이벤트만이 초기화되지 않고 무사히 실행됩니다.

ES5환경에서는 \_를 ‘비워놓음'으로 처리하기 위해 어쩔 수 없이 전역 공간을 침범했습니다. ES6에서는 Symbol. for 를 활용하면 더 좋습니다. Symbol.for메서드는 전역 심볼공간에 인자로 넘어온 문자열이 이미 있으면 해당 값을 참조하고, 선언돼 있지 않으면 새로 만드는 방식으로 어디서든 접근 가능하면서 유일무이한 상수를 만들고자할 때 적합합니다.

```tsx
(function () {
  let EmptySpace = Symbol.for("EMPTY_SPACE");
  // 기존 전역 공간에 'EMPTY_SPACE'라는 문자열을 가진 심볼이 없으므로 새로 생성
  console.log(EmptySpace);
})();

(function () {
  console.log(Symbol.for("EMPTY_SPACE"));
  // 기존 전역 심볼 공간에 'EMPTY_SPACE'라는 문자열 심볼이 있으므로 해당 값을 참조
})();
```

이 Symbol.for를 이용하면 위의 예제를 아래와 같이 바꿀 수 있습니다.

```tsx
(function () {
  let EmptySpace = Symbol.for("EMPTY_SPACE");
  // 기존 전역 공간에 'EMPTY_SPACE'라는 문자열을 가진 심볼이 없으므로 새로 생성
  console.log(EmptySpace);
})();

(function () {
  console.log(Symbol.for("EMPTY_SPACE"));
  // 기존 전역 심볼 공간에 'EMPTY_SPACE'라는 문자열 심볼이 있으므로 해당 값을 참조
})();

const partial3 = function () {
  // 생략
  return function () {
    //생략
    for (let i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === Symbol.for("EMPTY_SPACE")) {
        partialArgs[i] = restArgs.shift();
      }
    }
  };
};

const _ = Symbol.for("EMPTY_SPACE");
```

### 커링 함수

커링 함수란 여러개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출할 수 있게 체인 형태로 구성한 것을 말합니다. 커링은 한번에 하나의 인자를 전달하는 것을 원칙으로 합니다. 또한 마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않습니다.

```tsx
const curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
};

const getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25

const curry5 = (func) => (a) => (b) => (c) => (d) => (e) => func(a, b, c, d, e);
```

각 단계에서 받은 인자들을 모두 마지막 단계에서 참조할 것이므로 GC되지 않고 메모리에 차곡차곡 쌓았다가, 마지막 호출로 실행컨텍스트가 종료된 후에야 비로서 한꺼번에 GC의 대상이 됩니다.

이 커링함수는 당장 필요한 정보만 받아서 전달하고 또 필요한 정보가 들어오면 전달하는 식으로 결국 마지막 인자가 넘어갈 때까지 함수의 실행을 미룹니다. 이를 함수형 프로그래밍에서는 지연 실행 (lazy execution)이라고 합니다. 원하는 시점까지 지연시켰다가 실행하는 것이 요긴한 상황이라면 커링을 쓰는 것이 적합합니다.

## 정리

클로저란 어떤 함수에서 선언한 변수를 참조하는 내부함수를 외부로 전달할 경우, 함수의 실행 컨텍스트가 종료된 후에도 해당 변수가 사라지지 않는 현상입니다.

내부함수를 외부로 전달하는 방법에는 함수를 return 하는 경우뿐 아니라 콜백으로 전달하는 경우도 포함됩니다.

클로저는 본질이 메모리를 계속 차지하는 개념이므로 더는 사용하지 않게된 클로저에 대해서는 메모리를 차지하지 않도록 관리해줄 필요가 있습니다.
