# Promise

본인을 아주 유명한 가수라고 가정해 봅시다. 그리고 탑 가수인 본인이 밤·낮으로 다음 싱글 앨범이 언제 나오는지 물어보는 팬들을 상대해야 한다고 해 봅시다.

가수는 앨범이 출시되면 팬들이 자동으로 소식을 받아볼 수 있도록 해 부하를 덜 겁니다. 구독 리스트를 하나 만들어 팬들에게 전달해 이메일 주소를 적게 하고, 앨범이 준비되면 리스트에 있는 팬들에게 메일을 보내 앨범 관련 소식을 바로 받아볼 수 있게 하면 되죠. 이렇게 해 놓으면 녹음 스튜디오에 화재가 발생해서 출시 예정인 앨범이 취소되는 불상사가 발생해도 관련 소식을 팬들에게 전달 할 수 있습니다.

이제 모두가 행복해졌습니다. 밤낮으로 질문을 하는 팬이 사라졌고, 팬들은 앨범 출시를 놓치지 않을 수 있게 되었으니까요.

이 비유는 코드를 작성하면서 자주 만나게 되는 상황을 실제 일어날 법한 일로 바꾼 것입니다. 바로 아래 같은 상황 말이죠.

1. '제작 코드(producing code)'는 원격에서 스크립트를 불러오는 것 같은 시간이 걸리는 일을 합니다. 위 비유에선 '가수’가 제작 코드에 해당합니다.
2. '소비 코드(consuming code)'는 '제작 코드’의 결과를 기다렸다가 이를 소비합니다. 이때 소비 주체(함수)는 여럿이 될 수 있습니다. 위 비유에서 소비 코드는 '팬’입니다.
3. 프라미스(promise) 는 '제작 코드’와 '소비 코드’를 연결해 주는 특별한 자바스크립트 객체입니다. 위 비유에서 프라미스는 '구독 리스트’입니다. '프라미스’는 시간이 얼마나 걸리든 상관없이 약속한 결과를 만들어 내는 '제작 코드’가 준비되었을 때, 모든 소비 코드가 결과를 사용할 수 있도록 해줍니다.

사실 프라미스는 비유에서 사용된 구독 리스트보다 훨씬 복잡하기 때문에, 비유가 완벽하게 들어맞지는 않습니다. 프라미스엔 또 다른 기능도 있고, 한계도 있습니다. 하지만 일단 이 비유를 이용해 프라미스를 학습해보도록 합시다.

`promise`객체는 아래와 같은 문법으로 만들수 있다.

```js
let promise = new Promise(function (resolve, reject) {
  // executor (제작 코드, '가수')
});
```

new Promise에 전달되는 함수는 executor(실행자, 실행 함수) 라고 부릅니다. executor는 new Promise가 만들어질 때 자동으로 실행되는데, 결과를 최종적으로 만들어내는 제작 코드를 포함합니다. 위 비유에서 '가수’가 바로 executor입니다.

executor의 인수 resolve와 reject는 자바스크립트가 자체적으로 제공하는 콜백입니다. 개발자는 resolve와 reject를 신경 쓰지 않고 executor 안 코드만 작성하면 됩니다.

대신 executor에선 결과를 즉시 얻든, 늦게 얻든 상관없이 상황에 따라 인수로 넘겨준 콜백 중 하나를 반드시 호출해야 합니다.

- resolve(value) — 일이 성공적으로 끝난 경우, 그 결과를 나타내는 value와 함께 호출
- reject(error) — 에러 발생 시 에러 객체를 나타내는 error와 함께 호출 요약하면 다음과 같습니다. executor는 자동으로 실행되는데 여기서 원하는 일이 처리됩니다. 처리가 끝나면 executor는 처리 성공 여부에 따라 resolve나 reject를 호출합니다.

한편, new Promise 생성자가 반환하는 promise 객체는 다음과 같은 내부 프로퍼티를 갖습니다.

- state 처음엔 pending 이었다 resolve가 호출되면 fullfilled, reject호출시 rejected
- result 처음엔 undefined 이었다가 resolve(value)가 호출되면 value로 reject가 호출되면 error로 변한다.

그 전에 promise 생성자와 간단한 executor 함수로 만든 예시를 살펴봅시다. setTimeout을 이용해 executor 함수는 약간의 시간이 걸리도록 구현해 보았습니다.

```js
let promise = new Promise(function (resolve, reject) {
  // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.

  // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result가 'done'이 됩니다.
  setTimeout(() => resolve("done"), 1000);
});
```

1. executor는 new Promise에 의해 자동으로 그리고 즉각적으로 호출됩니다.

2. executor는 인자로 resolve와 reject 함수를 받습니다. 이 함수들은 자바스크립트 엔진이 미리 정의한 함수이므로 개발자가 따로 만들 필요가 없습니다. 다만, resolve나 reject 중 하나는 반드시 호출해야 합니다.

executor '처리’가 시작 된 지 1초 후, resolve("done")이 호출되고 결과가 만들어집니다. 이때 promise 객체의 상태는 다음과 같이 변합니다.
state pending -> fulfilled
result undefined -> done

이처럼 일이 성공적으로 처리되었을 때의 프라미스는 fulfilled promise(약속이 이행된 프라미스)라고 불린다.
이번엔 executor가 에러와 함께 약속을 거부하는 경우에 대해 보자.

```js
let promise = new Promise(function (resolve, reject) {
  // 1초 뒤에 에러와 함께 실행이 종료되었다는 신호를 보냅니다.
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});
```

state pending -> rejected
result: undefined -> error

지금까지 배운 내용을 요약해 봅시다. executor는 보통 시간이 걸리는 일을 수행합니다. 일이 끝나면 resolve나 reject 함수를 호출하는데, 이때 프라미스 객체의 상태가 변화합니다.

이행(resolved)되거나 거부(rejected)된 상태의 프라미스는 ‘처리된(settled)’ 프라미스라고 부릅니다. 반대되는 프라미스로 '대기(pending)'상태의 프라미스가 있습니다.

### 프라미스는 성공 또는 실패만 한다.

executor는 resolve나 reject 중 하나를 반드시 호출해야 합니다. 이때 변경된 상태는 더 이상 변하지 않습니다.

처리가 끝난 프라미스에 resolve와 reject를 호출하면 무시되죠.

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // 무시됨
  setTimeout(() => resolve("…")); // 무시됨
```

이렇게 executor에 의해 처리가 끝난 일은 결과 혹은 에러만 가질 수 있습니다.

여기에 더하여, resolve나 reject는 인수를 하나만 받고(혹은 아무것도 받지 않음) 그 이외의 인수는 무시한다는 특성도 있습니다.

### 에러 객체와 함께 거부하기

무언가 잘못된 경우, executor는 reject를 호출해야 합니다. 이때 인수는 resolve와 마찬가지로 어떤 타입도 가능하지만 Error 객체 또는 Error를 상속받은 객체를 사용할 것을 추천합니다. 이유는 뒤에서 설명하겠습니다.

### resolve, reject 함수 즉시 호출하기

executor는 대개 무언가를 비동기적으로 수행하고, 약간의 시간이 지난 후에 resolve/reject를 호출하는데, 꼭 이렇게 할 필요는 없습니다. 아래와 같이 resolve나 reject를 즉시 호출할 수도 있습니다.

```js
let promise = new Promise(function (resolve, reject) {
  // 일을 끝마치는 데 시간이 들지 않음
  resolve(123); // 결과(123)를 즉시 resolve에 전달함
});
```

어떤 일을 시작했는데 알고 보니 일이 이미 끝나 저장까지 되어있는 경우, 이렇게 resolve나 reject를 즉시 호출하는 방식을 사용할 수 있습니다.

이렇게 하면 프라미스는 즉시 이행 상태가 됩니다.

### state 와result는 내부에 있다.

프라미스 객체의 state, result 프로퍼티는 내부 프로퍼티이므로 개발자가 직접 접근할 수 없습니다. .then/.catch/.finally 메서드를 사용하면 접근 가능한데, 자세한 내용은 아래에서 살펴보겠습니다.

### then

.then 은 프라미스에서 가장 중요하고 기본이 되는 메서드이다.

```js
promise.then(
  function (result) {
    /* 결과(result)를 다룹니다 */
  },
  function (error) {
    /* 에러(error)를 다룹니다 */
  }
);
```

.then의 첫 번째 인수는 프라미스가 이행되었을 때 실행되는 함수이고, 여기서 실행 결과를 받습니다.

.then의 두 번째 인수는 프라미스가 거부되었을 때 실행되는 함수이고, 여기서 에러를 받습니다.

아래 예시는 성공적으로 이행된 프라미스에 어떻게 반응하는지 보여줍니다.

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
promise.then(
  (result) => alert(result), // 1초 후 "done!"을 출력
  (error) => alert(error) // 실행되지 않음
);
```

### catch

에러가 발생한 경우만 다루고 싶다면 .then(null, errorHandlingFunction)같이 null을 첫 번째 인수로 전달하면 됩니다. .catch(errorHandlingFunction)를 써도 되는데, .catch는 .then에 null을 전달하는 것과 동일하게 작동합니다.

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// .catch(f)는 promise.then(null, f)과 동일하게 작동합니다
promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력
.catch(f)는 문법이 간결하다는 점만 빼고 .then(null,f)과 완벽하게 같습니다.
```

### finally

try {...} catch {...}에 finally 절이 있는 것처럼, 프라미스에도 finally가 있습니다.

프라미스가 처리되면(이행이나 거부) f가 항상 실행된다는 점에서 .finally(f) 호출은 .then(f, f)과 유사합니다.

쓸모가 없어진 로딩 인디케이터(loading indicators)를 멈추는 경우같이, 결과가 어떻든 마무리가 필요하면 finally가 유용합니다.

사용법은 아래와 같습니다.

```js
new Promise((resolve, reject) => {
  /* 시간이 걸리는 어떤 일을 수행하고, 그 후 resolve·reject를 호출함 */
})
  // 성공·실패 여부와 상관없이 프라미스가 처리되면 실행됨
  .finally(() => 로딩 인디케이터 중지)
  .then(result => result와 err 보여줌 => error 보여줌)
```

그런데 finally는 .then(f, f)과 완전히 같진 않습니다. 차이점은 다음과 같습니다.

finally 핸들러엔 인수가 없습니다. finally에선 프라미스가 이행되었는지, 거부되었는지 알 수 없습니다. finally에선 절차를 마무리하는 ‘보편적’ 동작을 수행하기 때문에 성공·실패 여부를 몰라도 됩니다.

finally 핸들러는 자동으로 다음 핸들러에 결과와 에러를 전달합니다.result가 finally를 거쳐 then까지 전달되는 것을 확인해봅시다.

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("결과"), 2000);
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .then((result) => alert(result)); // <-- .then에서 result를 다룰 수 있음
```

프라미스에서 에러가 발생하고 이 에러가 finally를 거쳐 catch까지 전달되는 것을 확인해봅시다.

```js
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .catch((err) => alert(err)); // <-- .catch에서 에러 객체를 다룰 수 있음
```

finally는 프라미스 결과를 처리하기 위해 만들어 진 게 아닙니다. 프라미스 결과는 finally를 통과해서 전달되죠. 이런 특징은 아주 유용하게 사용되기도 합니다.
.finally(f)는 함수 f를 중복해서 쓸 필요가 없기 때문에 .then(f, f)보다 문법 측면에서 더 편리합니다.

### 처리된 프라미스의 핸들러는 즉각 실행됩니다.

프라미스가 대기 상태일 때, .then/catch/finally 핸들러는 프라미스가 처리되길 기다립니다. 반면, 프라미스가 이미 처리상태라면 핸들러가 즉각 실행됩니다.

```js
// 아래 프라미스는 생성과 동시에 이행됩니다.
let promise = new Promise((resolve) => resolve("완료!"));

promise.then(alert); // 완료! (바로 출력됨)
```

가수와 팬, 구독리스트 시나리오보다 프라미스가 더 복잡하다고 말한 이유가 바로 이런 기능 때문입니다. 가수가 신곡을 발표한 이후에 구독 리스트에 이름을 올리는 팬은 신곡 발표 여부를 알 수 없습니다. 구독 리스트에 이름을 올리는 것이 선행되어야 새로운 소식을 받을 수 있죠.

프라미스는 핸들러를 언제든 추가할 수 있다는 점에서 구독리스트 시나리오보다 더 유연합니다. 결과가 나와 있는 상태에서 핸들러를 등록하면 결과를 바로 받을 수 있습니다.

### 예시 loadScript

콜백기반

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () =>
    callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}
```

이제 프라미스를 이용해 함수를 다시 작성해 봅시다.

새로운 함수에선 콜백 함수 대신, 스크립트 로딩이 완전히 끝났을 때 이행되는 프라미스 객체를 만들고, 이를 반환해 보겠습니다. 외부 코드에선 .then을 이용해 핸들러(구독 함수)를 더하겠습니다.

```js
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () =>
      reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
  });
}
```

사용법은 다음과 같습니다.

```js
let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);

promise.then(
  (script) => alert(`${script.src}을 불러왔습니다!`),
  (error) => alert(`Error: ${error.message}`)
);

promise.then((script) => alert("또다른 핸들러..."));
```

프라미스를 사용한 코드가 콜백 기반 코드보다 더 나은 점을 정리하면 다음과 같습니다.

프라미스:
프라미스를 이용하면 흐름이 자연스럽습니다. loadScript(script)로 스크립트를 읽고, 결과에 따라 그다음(.then)에 무엇을 할지에 대한 코드를 작성하면 됩니다.
프라미스에 원하는 만큼 .then을 호출할 수 있습니다. .then을 호출하는 것은 새로운 ‘팬’(새로운 구독 함수)을 '구독 리스트’에 추가하는 것과 같습니다. 자세한 내용은 프라미스 체이닝에서 다루겠습니다.

콜백:
loadScript(script, callback)를 호출할 때, 함께 호출할 callback 함수가 준비되어 있어야 합니다. loadScript를 호출하기 이전에 호출 결과로 무엇을 할지 미리 알고 있어야 합니다.
콜백은 하나만 가능합니다.

## 프라미스 체이닝

콜백에서 언급한 문제를 다시 집어봅시다. 스크립트를 불러오는 것과 같이 순차적으로 처리해야 하는 비동기 작업이 여러 개 있다고 가정해 봅시다. 이런 상황을 어떻게 하면 코드로 잘 풀어낼 수 있을까요?

프라미스를 사용하면 여러 가지 해결책을 만들 수 있습니다.

이번 챕터에선 프라미스 체이닝(promise chaining)을 이용한 비동기 처리에 대해 다루도록 하겠습니다.

프라미스 체이닝은 아래와 같이 생겼습니다.

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    // (**)

    alert(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)

    alert(result); // 2
    return result * 2;
  })
  .then(function (result) {
    alert(result); // 4
    return result * 2;
  });
```

프라미스 체이닝은 result가 .then 핸들러의 체인(사슬)을 통해 전달된다는 점에서 착안한 아이디어입니다.
1.1초 후 최초 프라미스가 이행됩니다, – (\*) 2.이후 .then 핸들러가 호출됩니다. –(**)
3.2에서 반환한 값은 다음 .then 핸들러에 전달됩니다. – (\***) 4.이런 과정이 계속 이어집니다.

<b>이렇게 프라미스 체이닝이 가능한 이유는 promise.then을 호출하면 프라미스가 반환되기 때문입니다. 프라미스가 반환되기 때문에 .then을 호출할 수 있습니다.
핸들러가 값을 반환할 땐(then 이 값을 처리할 때 반환하는값), 이 값이 프라미스의 result가 됩니다. 따라서 다음 .then은 이 값을 이용해 호출됩니다.</b>

초보자는 프라미스 하나에 .then을 여러 개 추가한 후, 이를 체이닝이라고 착각합니다. 하지만 이는 체이닝이 아닙니다.

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});
```

<b>위 예시에선 프라미스 하나에 여러 개의 핸들러를 등록했습니다. 이 핸들러들은 result를 순차적으로 전달하지 않고, 독립적으로 처리합니다.
동일한 프라미스에 등록된 .then 전체는 동일한 결과(프라미스의 result)를 받습니다. 따라서 위 예시를 실행하면 얼럿 창엔 전부 1이 출력됩니다.</b>

이런 식으로 한 프라미스에 여러 개의 핸들러를 등록해서 사용하는 경우는 거의 없습니다. 프라미스 체이닝이 더 많이 쓰이죠.

### 프라미스 반환하기

.then(handler)에 사용된 핸들러가 프라미스를 생성하거나 반환하는 경우도 있습니다.

이런 경우에 이어지는 핸들러는 프라미스가 처리될 때까지 기다리다가 처리가 완료되면 그 결과를 받습니다.

예시:

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    alert(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)

    alert(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 4
  });
```

예시에서 첫 번째 .then은 1을 출력하고 new Promise(…)를 반환((_))합니다.
1초 후 이 프라미스가 이행되고 그 결과(resolve의 인수인 result _ 2)는 두 번째 .then으로 전달됩니다. 두 번째 핸들러((\*\*))는 2를 출력하고 동일한 과정을 반복합니다.

따라서 얼럿 창엔 이전 예시와 동일하게 1, 2, 4가 차례대로 출력됩니다. 다만 얼럿 창 사이에 1초의 딜레이가 생깁니다.

이렇게 프라미스를 반환하는 것도 비동기 작업 체인을 만들 수 있게 합니다.

#### 예제: loadScript

위에서 배운 기능을 사용해 이전 챕터에서 프라미스를 사용해 정의한 loadScript(스크립트를 순차적으로 불러줌)를 다시 작성해봅시다.

```js
loadScript("/article/promise-chaining/one.js")
  .then(function (script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function (script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function (script) {
    // 불러온 스크립트 안에 정의된 함수를 호출해
    // 실제로 스크립트들이 정상적으로 로드되었는지 확인합니다.
    one();
    two();
    three();
  });
```

화살표 함수를 사용해 코드를 줄이는 것도 가능합니다.

```js
loadScript("/article/promise-chaining/one.js")
  .then((script) => loadScript("/article/promise-chaining/two.js"))
  .then((script) => loadScript("/article/promise-chaining/three.js"))
  .then((script) => {
    // 스크립트를 정상적으로 불러왔기 때문에, 스크립트 내의 함수를 호출할 수 있습니다.
    one();
    two();
    three();
  });
```

loadScript를 호출할 때마다 프라미스가 반환되고 다음 .then은 이 프라미스가 이행되었을 때 실행됩니다. 이후에 다음 스크립트를 로딩하기 위한 초기화가 진행됩니다. 스크립트는 이런 과정을 거쳐 순차적으로 로드됩니다.

체인에 더 많은 비동기 동작을 추가할 수도 있습니다. 추가 작업이 많아져도 코드가 오른쪽으로 길어지지 않고, 아래로만 증가한다는 점에 주목해 주시기 바랍니다. '멸망’의 피라미드가 만들어지지 않습니다.

한편, 아래와 같이 각 loadScript에 .then을 바로 붙일 수도 있습니다.

```js
loadScript("/article/promise-chaining/one.js").then((script1) => {
  loadScript("/article/promise-chaining/two.js").then((script2) => {
    loadScript("/article/promise-chaining/three.js").then((script3) => {
      // 여기서 script1, script2, script3에 정의된 함수를 사용할 수 있습니다.
      one();
      two();
      three();
    });
  });
});
```

이렇게 .then을 바로 붙여도 동일한 동작(스크립트 세 개를 순차적으로 불러오는 작업)을 수행합니다. 하지만 코드가 ‘오른쪽으로’ 길어졌네요. 콜백에서 언급한 문제와 동일한 문제가 발생했습니다.

프라미스를 이제 막 배우기 시작해 체이닝에 대해 잘 모른다면 위와같이 코드를 작성할 수 있습니다. 그러나 대개 체이닝이 선호됩니다.

중첩 함수에서 외부 스코프에 접근할 수 있기 때문에 .then을 바로 쓰는 게 괜찮은 경우도 있습니다. 위 예제에서 가장 깊은 곳에 있는 중첩 콜백은 script1, script2, script3 안에 있는 변수 모두에 접근할 수 있습니다. 이런 예외 상황이 있다는 정도만 알아두도록 합시다.

## thenable

핸들러는 프라미스가 아닌 thenable이라 불리는 객체를 반환하기도 합니다. 메서드 .then을 가진 객체는 모두 thenable객체라고 부르는데, 이 객체는 프라미스와 같은 방식으로 처리됩니다.

‘thenable’ 객체에 대한 아이디어는 서드파티 라이브러리가 ‘프라미스와 호환 가능한’ 자체 객체를 구현할 수 있다는 점에서 나왔습니다. 이 객체들엔 자체 확장 메서드가 구현되어 있겠지만, .then이 있기 때문에 네이티브 프라미스와도 호환 가능합니다.

아래는 thenable 객체에 대한 예시입니다.

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { 네이티브 코드 }
    // 1초 후 this.num*2와 함께 이행됨
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000밀리 초 후 2를 보여줌
```

자바스크립트는 (\*)로 표시한 줄에서 .then 핸들러가 반환한 객체를 확인합니다. 이 객체에 호출 가능한 메서드 then이 있으면 then이 호출됩니다. then은 resolve와 reject라는 네이티브 함수를 인수로 받고(executor과 유사함), 둘 중 하나가 호출될 때까지 기다립니다. 위 예시에서 resolve(2)는 1초 후에 호출됩니다((\*\*)). 호출 후 결과는 체인을 따라 아래로 전달됩니다.

이런 식으로 구현하면 Promise를 상속받지 않고도 커스텀 객체를 사용해 프라미스 체이닝을 만들 수 있습니다.

### fetch와 체이닝 함께 응용하기

프론트 단에선, 네트워크 요청 시 프라미스를 자주 사용합니다. 이에 관련된 예시를 살펴봅시다.

예시에선 메서드 fetch를 사용해 원격 서버에서 사용자 정보를 가져오겠습니다. fetch엔 다양한 선택 매개변수가 있는데 자세한 내용은 별도의 챕터에서 다루기로 하고, 여기선 기본 문법만 사용해 보겠습니다.

```js
let promise = fetch(url);
```

위 코드는 url에 네트워크 요청을 보내고 프라미스를 반환합니다.

를 실행하면 url에 네트워크 요청이 가고 프라미스가 반환됩니다. 원격 서버가 헤더와 함께 응답을 보내면, 프라미스는 response 객체와 함께 이행됩니다. 그런데 response 전체가 완전히 다운로드되기 전에 이행 상태가 되어버리죠.

응답 전체를 읽으려면 메서드 response.text()를 호출해야 합니다. response.text()는 원격 서버에서 전송한 텍스트 전체가 다운로드되면, 이 텍스트를 result 값으로 갖는 이행된 프라미스를 반환합니다.

아래 코드를 실행하면 user.json에 요청을 보내고, 서버에서 해당 텍스트를 불러옵니다.

```js
fetch("/article/promise-chaining/user.json")
  // 원격 서버가 응답하면 .then 아래 코드가 실행됩니다.
  .then(function (response) {
    // response.text()는 응답 텍스트 전체가 다운로드되면
    // 응답 텍스트를 새로운 이행 프라미스를 만들고, 이를 반환합니다.
    return response.text();
  })
  .then(function (text) {
    // 원격에서 받아온 파일의 내용
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

그런데 메서드 response.json() 를 쓰면 원격에서 받아온 데이터를 읽고, JSON으로 파싱할 수 있습니다. 예시엔 이 메서드가 더 적합하므로 기존에 작성한 코드를 약간 변경해 보겠습니다.

화살표 함수도 함께 써서 코드를 간결하게 해보겠습니다.

```js
// 위 코드와 동일한 기능을 하지만, response.json()은 원격 서버에서 불러온 내용을 JSON으로 변경해줍니다.
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => alert(user.name)); // iliakan, got user name
```

불러온 사용자 정보를 가지고 무언가를 더 해보겠습니다.

GitHub에 요청을 보내 사용자 프로필을 불러오고 아바타를 출력해 보는 것같이 말이죠.

```js
// user.json에 요청을 보냅니다.
fetch("/article/promise-chaining/user.json")
  // 응답받은 내용을 json으로 불러옵니다.
  .then((response) => response.json())
  // GitHub에 요청을 보냅니다.
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // 응답받은 내용을 json 형태로 불러옵니다.
  .then((response) => response.json())
  // 3초간 아바타 이미지(githubUser.avatar_url)를 보여줍니다.
  .then((githubUser) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

코드는 주석에 적은 대로 잘 동작합니다. 그런데 위 코드엔 프로미스를 다루는데 서툰 개발자가 자주 저지르는 잠재적 문제가 내재돼 있습니다.

(\*)로 표시한 줄을 봅시다. 만약 아바타가 잠깐 보였다가 사라진 이후에 무언가를 하고 싶으면 어떻게 해야 할까요? 사용자 정보를 수정할 수 있게 해주는 폼을 보여주는 것 같은 작업을 추가하는 경우같이 말이죠. 지금으로선 방법이 없습니다.

체인을 확장할 수 있도록 만들려면, 아바타가 사라질 때 이행 프라미스를 반환해 줘야 합니다.

아래와 같이 말이죠.

```js
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise(function (resolve, reject) {
        // (*)
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser); // (**)
        }, 3000);
      })
  )
  // 3초 후 동작함
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
```

(\*)로 표시한 곳의 .then 핸들러는 이제 setTimeout안의 resolve(githubUser)를 호출했을 때((\*\*)) 만 처리상태가 되는 new Promise를 반환합니다. 체인의 다음 .then은 이를 기다리죠.

비동기 동작은 항상 프라미스를 반환하도록 하는 것이 좋습니다. 지금은 체인을 확장할 계획이 없더라도 이렇게 구현해 놓으면 나중에 체인 확장이 필요한 경우 손쉽게 체인을 확장할 수 있습니다.

이제 코드를 재사용 가능한 함수 단위로 분리해 마무리하겠습니다.

```js
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 함수를 이용하여 다시 동일 작업 수행
loadJson("/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
// ...
```

## 요약

.then 또는 catch/finally 핸들러(어떤 경우도 상관없음)가 프라미스를 반환하면, 나머지 체인은 프라미스가 처리될 때까지 대기합니다. 처리가 완료되면 프라미스의 result(값 또는 에러)가 다음 체인으로 전달됩니다.

이를 그림으로 나타내면 아래와 같습니다.
![promise](https://user-images.githubusercontent.com/63354527/112124158-63aded00-8c05-11eb-83e1-e4d0ac9f0562.PNG)

## 프라미스와 에러 핸들링

프라미스 체인은 에러를 잘 처리합니다. 프라미스가 거부되면 제어 흐름이 제일 가까운 rejection 핸들러로 넘어갑니다. 이는 실무에서 아주 유용하게 사용됩니다.

존재하지 않는 주소를 fetch에 넘겨주는 예시를 살펴봅시다. 에러가 발생하지만 .catch를 사용해 에러를 처리할 수 있습니다.

```js
fetch("https://no-such-server.blabla") // 거부
  .then((response) => response.json())
  .catch((err) => alert(err)); // TypeError: failed to fetch (출력되는 내용은 다를 수 있음)
```

위 예시를 통해 알 수 있듯이 .catch는 바로 나올 필요가 없습니다. 하나 혹은 여러 개의 .then 뒤에 올 수 있습니다.

이번엔 사이트에는 아무런 문제가 없지만, 응답으로 받은 JSON의 형식이 잘못된 경우를 살펴보겠습니다. 가장 쉬운 에러 처리 방법은 체인 끝에 .catch를 붙이는 것입니다.

```js
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  .catch((error) => alert(error.message));
```

정상적인 경우라면 .catch는 절대 트리거 되지 않습니다. 그런데 네트워크 문제, 잘못된 형식의 JSON 등으로 인해 프라미스 중 하나라도 거부되면 .catch에서 에러를 잡게 됩니다.

### 암시적 try...catch

프라미스 executor와 프라미스 핸들러 코드 주위엔 '보이지 않는 try..catch'가 있습니다. 예외가 발생하면 암시적 try..catch에서 예외를 잡고, 이를 reject처럼 다룹니다.

예시:

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    throw new Error("에러 발생!"); // 프라미스가 거부됨
  })
  .catch(alert); // Error: 에러 발생!
```

위 예시는 아래 예시와 똑같이 동작합니다.

```js
new Promise((resolve, reject) => {
  reject(new Error("에러 발생!"));
}).catch(alert); // Error: 에러 발생!
```

executor 주위의 '암시적 try..catch'는 자동으로 에러를 잡고, 이를 거부상태의 프라미스로 변경시킵니다.

이런 일은 executor 함수뿐만 아니라 핸들러에서도 발생합니다. .then 핸들러 안에서 throw를 사용해 에러를 던지면, 이 자체가 거부된 프라미스를 의미하게 됩니다. 따라서 제어 흐름이 가장 가까운 에러 핸들러로 넘어갑니다.

예시:

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    throw new Error("에러 발생!"); // 프라미스가 거부됨
  })
  .catch(alert); // Error: 에러 발생!
```

throw문이 만든 에러뿐만 아니라 모든 종류의 에러가 암시적 try..catch에서 처리됩니다. 암시적 try..catch가 프로그래밍 에러를 어떻게 처리하는지 살펴봅시다.

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    blabla(); // 존재하지 않는 함수
  })
  .catch(alert); // ReferenceError: blabla is not defined
```

## 다시 던지기

체인 마지막의 .catch는 try..catch와 유사한 역할을 합니다. .then 핸들러를 원하는 만큼 사용하다 마지막에 .catch 하나만 붙이면, .then 핸들러에서 발생한 모든 에러를 처리할 수 있습니다.

일반 try..catch에선 에러를 분석하고, 처리할 수 없는 에러라 판단되면 다시 던질 때가 있습니다. 프라미스에도 유사한 일을 할 수 있습니다.

.catch 안에서 throw를 사용하면 제어 흐름이 가장 가까운 곳에 있는 에러 핸들러로 넘어갑니다. 여기서 에러가 성공적으로 처리되면 가장 가까운 곳에 있는 .then 핸들러로 제어 흐름이 넘어가 실행이 이어집니다.

아래 예시의 .catch는 에러를 성공적으로 처리합니다.

```js
// 실행 순서: catch -> then
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .catch(function (error) {
    alert("에러가 잘 처리되었습니다. 정상적으로 실행이 이어집니다.");
  })
  .then(() => alert("다음 핸들러가 실행됩니다."));
```

.catch 블록이 정상적으로 종료되었기 때문에 다음 성공 핸들러, .then이 호출된 것을 확인할 수 있습니다.

.catch를 활용한 또 다른 사례를 살펴봅시다. (\*)로 표시한 핸들러에서 에러를 잡는데, 여기서는 에러를 처리하지 못하기 때문에(URIError 처리 방법만 알고 있음) 에러를 다시 던집니다.

```js
// 실행 순서: catch -> catch
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .catch(function (error) {
    // (*)

    if (error instanceof URIError) {
      // 에러 처리
    } else {
      alert("처리할 수 없는 에러");

      throw error; // 에러 다시 던지기
    }
  })
  .then(function () {
    /* 여기는 실행되지 않습니다. */
  })
  .catch((error) => {
    // (**)

    alert(`알 수 없는 에러가 발생함: ${error}`);
    // 반환값이 없음 => 실행이 계속됨
  });
```

실행 흐름이 첫 번째 .catch (\*)로 넘어갔다가 다음 .catch (\*\*)로 이어지는 것을 확인할 수 있습니다.

## 처리되지 못한 거부

에러를 처리하지 못하면 무슨일이 생길까?

```js
new Promise(function () {
  noSuchFunction(); // 에러 (존재하지 않는 함수)
}).then(() => {
  // 성공상태의 프라미스를 처리하는 핸들러. 한 개 혹은 여러 개가 있을 수 있음
}); // 끝에 .catch가 없음!
```

에러가 발생하면 프라미스는 거부상태가 되고, 실행 흐름은 가장 가까운 rejection 핸들러로 넘어갑니다. 그런데 위 예시엔 예외를 처리해 줄 핸들러가 없어서 에러가 ‘갇혀버립니다’. 에러를 처리할 코드가 없기 때문입니다.

이런 식으로 코드에 처리하지 못한 에러가 남게 되면 실무에선 끔찍한 일이 발생합니다.

일반적인 에러가 발생하고 이를 try..catch에서 처리하지 못하는 경우를 생각해봅시다. 스크립트가 죽고 콘솔 창에 메시지가 출력되겠죠. 거부된 프라미스를 처리하지 못했을 때도 유사한 일이 발생합니다.

자바스크립트 엔진은 프라미스 거부를 추적하다가 위와 같은 상황이 발생하면 전역 에러를 생성합니다. 콘솔창을 열고 위 예시를 실행하면 전역 에러를 확인할 수 있습니다.

브라우저 환경에선 이런 에러를 unhandledrejection 이벤트로 잡을 수 있습니다.

```js
window.addEventListener("unhandledrejection", function (event) {
  // 이벤트엔 두 개의 특별 프로퍼티가 있습니다.
  alert(event.promise); // [object Promise] - 에러를 생성하는 프라미스
  alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
});

new Promise(function () {
  throw new Error("에러 발생!");
}); // 에러 처리 핸들러, catch가 없음
```

unhandledrejection 이벤트는 HTML 명세서에 정의된 표준 이벤트입니다.

브라우저 환경에선 에러가 발생했는데 .catch가 없으면 unhandledrejection 핸들러가 트리거 됩니다. unhandledrejection 핸들러는 에러 정보가 담긴 event 객체를 받기 때문에 이 핸들러 안에서 원하는 작업을 할 수 있습니다.

대개 이런 에러는 회복할 수 없기 때문에 개발자로서 할 수 있는 최선의 방법은 사용자에게 문제 상황을 알리고 가능하다면 서버에 에러 정보를 보내는 것입니다.

Node.js같은 기타 호스트 환경에도 처리하지 못한 에러를 다루는 방법을 여러 가지 제공합니다.

## 요약

.catch 는 프라미스에서 발생한 모든 에러를 다룹니다. reject()가 호출되거나 에러가 던져지면 .catch에서 이를 처리합니다.
.catch는 에러를 처리하고 싶은 지점에 정확히 위치시켜야 합니다. 물론 어떻게 에러를 처리할지 알고 있어야 하죠. 핸들러에선 에러를 분석하고(커스텀 에러 클래스가 이때 도움이 됩니다) 알 수 없는 에러(프로그래밍 실수로 발생한 에러일 확률이 높습니다)는 다시 던질 수 있습니다.
에러 발생 시, 회복할 방법이 없다면 .catch를 사용하지 않아도 괜찮습니다.
unhandledrejection 이벤트 핸들러를 사용해 처리되지 않은 에러를 추적하고, 이를 사용자(혹은 서버에)에게 알려서 애플리케이션이 아무런 설명도 없이 ‘그냥 죽는걸’ 방지합시다. 브라우저 환경에선 예방에 unhandledrejection을, 다른 환경에선 유사한 핸들러를 사용할 수 있습니다.

## 프라미스 API

Promise 클래스에는 5가지 정적 메서드가 있습니다. 이번 챕터에선 다섯 메서드의 유스 케이스에 대해서 빠르게 알아보겠습니다.

Promise.all
여러 개의 프라미스를 동시에 실행시키고 모든 프라미스가 준비될 때까지 기다린다고 해봅시다.

복수의 URL에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 이런 상황이 발생합니다.

Promise.all은 이럴 때 사용할 수 있습니다.

문법:

```js
let promise = Promise.all([...promises...]);
```

Promise.all은 요소 전체가 프라미스인 배열(엄밀히 따지면 이터러블 객체이지만, 대개는 배열임)을 받고 새로운 프라미스를 반환합니다.

배열 안 프라미스가 모두 처리되면 새로운 프라미스가 이행되는데, 배열 안 프라미스의 결괏값을 담은 배열이 새로운 프라미스의 result가 됩니다.

아래 Promise.all은 3초 후에 처리되고, 반환되는 프라미스의 result는 배열 [1, 2, 3]이 됩니다.

```js
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 프라미스 전체가 처리되면 1, 2, 3이 반환됩니다. 각 프라미스는 배열을 구성하는 요소가 됩니다.
```

배열 result의 요소 순서는 Promise.all에 전달되는 프라미스 순서와 상응한다는 점에 주목해 주시기 바랍니다. Promise.all의 첫 번째 프라미스는 가장 늦게 이행되더라도 처리 결과는 배열의 첫 번째 요소에 저장됩니다.

작업해야 할 데이터가 담긴 배열을 프라미스 배열로 매핑하고, 이 배열을 Promise.all로 감싸는 트릭은 자주 사용됩니다.

URL이 담긴 배열을 fetch를 써서 처리하는 예시를 살펴봅시다.

```js
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// fetch를 사용해 url을 프라미스로 매핑합니다.
let requests = urls.map((url) => fetch(url));

// Promise.all은 모든 작업이 이행될 때까지 기다립니다.
Promise.all(requests).then((responses) =>
  responses.forEach((response) => alert(`${response.url}: ${response.status}`))
);
```

GitHub 유저네임이 담긴 배열을 사용해 사용자 정보를 가져오는 예시를 살펴봅시다(id를 기준으로 장바구니 목록을 불러올 때도 같은 로직을 사용할 수 있습니다).

```js
let names = ["iliakan", "remy", "jeresig"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // 모든 응답이 성공적으로 이행되었습니다.
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.
    }

    return responses;
  })
  // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장됩니다.
  .then((users) => users.forEach((user) => alert(user.name)));
```

Promise.all에 전달되는 프라미스 중 하나라도 거부되면, Promise.all이 반환하는 프라미스는 에러와 함께 바로 거부됩니다.

```js
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("에러 발생!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert); // Error: 에러 발생!
```

2초 후 두 번째 프라미스가 거부되면서 Promise.all 전체가 거부되고, .catch가 실행됩니다. 거부 에러는 Promise.all 전체의 결과가 됩니다.

에러가 발생하면 다른 프라미스는 무시된다.
프라미스가 하나라도 거부되면 Promise.all은 즉시 거부되고 배열에 저장된 다른 프라미스의 결과는 완전히 잊힙니다. 이행된 프라미스의 결과도 무시되죠.

fetch를 사용해 호출 여러 개를 만들면, 그중 하나가 실패하더라도 호출은 계속 일어납니다. 그렇더라도 Promise.all은 다른 호출을 더는 신경 쓰지 않습니다. 프라미스가 처리되긴 하겠지만 그 결과는 무시됩니다.

프라미스에는 '취소’라는 개념이 없어서 Promise.all도 프라미스를 취소하지 않습니다. 또 다른 챕터에서 배울 AbortController를 사용하면 프라미스 취소가 가능하긴 하지만, 프라미스 API는 아닙니다.

이터러블 객체가 아닌 ‘일반’ 값도 Promise.all(iterable)에 넘길 수 있습니다.
Promise.all(...)은 대개 프라미스가 요소인 이러터블 객체(대부분 배열)를 받습니다. 그런데 프라미스가 아닌 객체가 배열을 구성하면, 요소가 ‘그대로’ 결과 배열로 전달됩니다.

아래 예시의 결과는 [1, 2, 3]입니다.

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  }),
  2,
  3,
]).then(alert); // 1, 2, 3
```

## Promise.allSettled

Promise.all은 프라미스가 하나라도 거절되면 전체를 거절합니다. 따라서, 프라미스 결과가 모두 필요할 때같이 ‘모 아니면 도’ 일 때 유용합니다.

```js
Promise.all([
  fetch("/template.html"),
  fetch("/style.css"),
  fetch("/data.json"),
]).then(render); // render 메서드는 fetch 결과 전부가 있어야 제대로 동작합니다.
```

반면, Promise.allSettled는 모든 프라미스가 처리될 때까지 기다립니다. 반환되는 배열은 다음과 같은 요소를 갖습니다.
응답이 성공할 경우 – {status:"fulfilled", value:result}
에러가 발생한 경우 – {status:"rejected", reason:error}

fetch를 사용해 여러 사람의 정보를 가져오고 있다고 해봅시다. 여러 요청 중 하나가 실패해도 다른 요청 결과는 여전히 있어야 합니다.

이럴 때 Promise.allSettled를 사용할 수 있습니다.

```js
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      alert(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      alert(`${urls[num]}: ${result.reason}`);
    }
  });
});
```

(\*)로 표시한 줄의 results는 다음과 같을 겁니다.

```json
[
  {status: 'fulfilled', value: ...응답...},
  {status: 'fulfilled', value: ...응답...},
  {status: 'rejected', reason: ...에러 객체...}
]
```

Promise.allSettled를 사용하면 이처럼 각 프라미스의 상태와 값 또는 에러를 받을 수 있습니다.
브라우저가 Promise.allSettled를 지원하지 않는다면 폴리필을 구현하면 됩니다.

```js
if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(
      promises.map((p) =>
        Promise.resolve(p).then(
          (value) => ({
            status: "fulfilled",
            value,
          }),
          (reason) => ({
            status: "rejected",
            reason,
          })
        )
      )
    );
  };
}
```

여기서 promises.map은 입력값을 받아 p => Promise.resolve(p)로 입력값을 프라미스로 변화시킵니다(프라미스가 아닌 값을 받은 경우). 그리고 모든 프라미스에 .then 핸들러가 추가됩니다.

then 핸들러는 성공한 프라미스의 결괏값 value를 {status:'fulfilled', value}로, 실패한 프라미스의 결괏값 reason을 {status:'rejected', reason}으로 변경합니다. Promise.allSettled의 구성과 동일하게 말이죠.

이렇게 폴리필을 구현하면 프라미스 일부가 거부되더라도 Promise.allSettled를 사용해 프라미스 전체의 결과를 얻을 수 있습니다.

## Promise.race

Promise.race는 Promise.all과 비슷합니다. 다만 가장 먼저 처리되는 프라미스의 결과(혹은 에러)를 반환합니다.

```js
let promise = Promise.race(iterable);
```

아래 예시의 결과는 1입니다.

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("에러 발생!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
```

첫 번째 프라미스가 가장 빨리 처리상태가 되기 때문에 첫 번째 프라미스의 결과가 result 값이 됩니다. 이렇게 Promise.race를 사용하면 '경주(race)의 승자’가 나타난 순간 다른 프라미스의 결과 또는 에러는 무시됩니다.

## Promise.resolve/reject

프라미스 메서드 Promise.resolve와 Promise.reject는 async/await 문법(뒤에서 다룸)이 생긴 후로 쓸모없어졌기 때문에 근래에는 거의 사용하지 않습니다.

여기선 튜토리얼의 완성도를 높이고 어떤 이유 때문이라도 async/await를 사용하지 못하는 분들을 위해서 이 두 메서드에 대해 알아보겠습니다.

Promise.resolve(value)는 결괏값이 value인 이행 상태 프라미스를 생성합니다.

아래 코드와 동일한 일을 수행합니다.

```js
let promise = new Promise((resolve) => resolve(value));
```

Promise.resolve는 호환성을 위해 함수가 프라미스를 반환하도록 해야 할 때 사용할 수 있습니다.

아래 함수 loadCached는 인수로 받은 URL을 대상으로 fetch를 호출하고, 그 결과를 기억(cache)합니다. 나중에 동일한 URL을 대상으로 fetch를 호출하면 캐시에서 호출 결과를 즉시 가져오는데, 이때 Promise.resolve를 사용해 캐시 된 내용을 프라미스로 만들어 반환 값이 항상 프라미스가 되게 합니다.

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}
```

loadCached를 호출하면 프라미스가 반환된다는 것이 보장되기 때문에 loadCached(url).then(…)을 사용할 수 있습니다. loadCached 뒤에 언제나 .then을 쓸 수 있게 됩니다. (\*)로 표시한 줄에서 Promise.resolve를 사용한 이유가 바로 여기에 있습니다.

Promise.reject(error)는 결괏값이 error인 거부 상태 프라미스를 생성합니다.

아래 코드와 동일한 일을 수행합니다.

```js
let promise = new Promise((resolve, reject) => reject(error));
```

## 프라미스화

콜백을 받는 함수를 프라미스를 반환하는 함수로 바꾸는 것을 '프라미스화(promisification)'라고 합니다.

콜백보다는 프라미스가 더 편리하기 때문에, 구현을 하다 보면 콜백 기반 함수와 라이브러리를 프라미스를 반환하는 함수로 바꾸는 게 좋은 경우가 종종 생길 겁니다.

콜백 챕터에서 사용했던 loadScript(src, callback) 예시를 사용해 프라미스화에 대해 좀 더 자세히 알아봅시다.

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () =>
    callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})
```

loadScript(src, callback)를 이제 프라미스화해봅시다. 새로운 함수 loadScriptPromise(src)는 loadScript와 동일하게 동작하지만 callback을 제외한 src만 인수로 받아야 하고, 프라미스를 반환해야 합니다.

```js
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// 사용법:
// loadScriptPromise('path/script.js').then(...)
```

새롭게 구현한 loadScriptPromise는 프라미스 기반 코드와 잘 융화됩니다.

예시에서 볼 수 있듯이, loadScriptPromise는 기존 함수 loadScript에 모든 일을 위임합니다. loadScript의 콜백은 스크립트 로딩 상태에 따라 이행 혹은 거부상태의 프라미스를 반환합니다.

그런데 실무에선 함수 하나가 아닌 여러 개의 함수를 프라미스화 해야 할 겁니다. 헬퍼 함수를 만드는 게 좋을 것 같네요. 프라미스화를 적용 할 함수 f를 받고 래퍼 함수를 반환하는 함수 promisify(f)를 만들어봅시다.

promisify(f)가 반환하는 래퍼 함수는 위 예시와 동일하게 동작할 겁니다. 프라미스를 반환하고 호출을 기존 함수 f에 전달하여 커스텀 콜백 내의 결과를 추적해야 하죠.

```js
function promisify(f) {
  return function (...args) { // 래퍼 함수를 반환함
    return new Promise((resolve, reject) => {
      function callback(err, result) { // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가합니다.

      f.call(this, ...args); // 기존 함수를 호출합니다.
    });
  };
};

// 사용법:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

위 예시는 프라미스화 할 함수가 인수가 두 개((err, result))인 콜백을 받을 것이라 가정하고 작성되었습니다. 십중팔구 이런 상황일 것이고, 커스텀 콜백은 이 상황에 딱 들어맞습니다. promisify가 잘 동작하는 것은 말할 것도 없겠죠.

그런데 함수 f가 두 개를 초과하는 인수를 가진 콜백, callback(err, res1, res2, ...)을 받는다면 어떤 일이 발생할까요?

이런 경우를 대비하여 좀 더 진화한 promisify를 만들어 봅시다. 새롭게 만든 함수를 promisify(f, true)형태로 호출하면, 프라미스 결과는 콜백의 성공 케이스(results)를 담은 배열, [res1, res2, ...]이 됩니다.

```js
// 콜백의 성공 결과를 담은 배열을 얻게 해주는 promisify(f, true)
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // f에 사용할 커스텀 콜백
        if (err) {
          reject(err);
        } else {
          // manyArgs가 구체적으로 명시되었다면, 콜백의 성공 케이스와 함께 이행 상태가 됩니다.
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// 사용법:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

callback(result)같이 err이 없는 형태나 지금까지 언급하지 않은 형태의 이색적인 콜백도 있을 수 있는데, 이런 경우엔 헬퍼 함수를 사용하지 않고 직접 프라미스화 하면 됩니다.

본 챕터에서 설명한 헬퍼 함수보다 더 유용한 형태의 프라미스화를 도와주는 함수를 제공하는 모둘도 많습니다. es6-promisify가 대표적인 예입니다. Node.js에선 내장 함수 util.promisify를 사용해 프라미스화를 할 수 있습니다.
프라미스화는 곧 배우게 될 async/await와 함께 사용하면 더 좋습니다. 다만, 콜백을 완전히 대체하지는 못한다는 사실을 기억해 두시기 바랍니다.

프라미스는 하나의 결과만 가질 수 있지만, 콜백은 여러 번 호출할 수 있기 때문입니다.

따라서 프라미스화는 콜백을 단 한 번 호출하는 함수에만 적용하시기 바랍니다. 프라미스화한 함수의 콜백을 여러 번 호출해도, 두 번째부터는 무시됩니다.

## async 와 await

async와 await라는 특별한 문법을 사용하면 프라미스를 좀 더 편하게 사용할 수 있습니다. async/await는 놀라울 정도로 이해하기 쉽고, 사용법도 어렵지 않습니다.
async 키워드부터 알아봅시다. async는 function 앞에 위치합니다.

```js
async function f() {
  return 1;
}
```

function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환합니다. 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환되도록 합니다.

아래 예시의 함수를 호출하면 result가 1인 이행 프라미스가 반환됩니다. 직접 확인해 봅시다.

```js
async function f() {
  return 1;
}

f().then(alert); // 1
```

명시적으로 프라미스를 반환하는 것도 가능한데, 결과는 동일합니다.

```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

async가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환합니다. 굉장히 간단하죠? 그런데 async가 제공하는 기능은 이뿐만이 아닙니다. 또 다른 키워드 await는 async 함수 안에서만 동작합니다. await는 아주 멋진 녀석이죠.
await 문법은 다음과 같습니다.

```js
// await는 async 함수 안에서만 동작합니다.
let value = await promise;
```

자바스크립트는 await 키워드를 만나면 프라미스가 처리(settled)될 때까지 기다립니다. 결과는 그 이후 반환됩니다.

1초 후 이행되는 프라미스를 예시로 사용하여 await가 어떻게 동작하는지 살펴봅시다.

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000);
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

함수를 호출하고, 함수 본문이 실행되는 도중에 (\*)로 표시한 줄에서 실행이 잠시 '중단’되었다가 프라미스가 처리되면 실행이 재개됩니다. 이때 프라미스 객체의 result 값이 변수 result에 할당됩니다. 따라서 위 예시를 실행하면 1초 뒤에 '완료!'가 출력됩니다.

await('기다리다’라는 뜻을 가진 영단어 – 옮긴이)는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만듭니다. 프라미스가 처리되면 그 결과와 함께 실행이 재개되죠. 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않습니다.

await는 promise.then보다 좀 더 세련되게 프라미스의 result 값을 얻을 수 있도록 해주는 문법입니다. promise.then보다 가독성 좋고 쓰기도 쉽습니다.

프라미스 체이닝 챕터의 showAvatar() 예시를 async/await를 사용해 다시 작성해봅시다.

먼저 .then 호출을 await로 바꿔야 합니다.
function 앞에 async를 붙여 await를 사용할 수 있도록 해야 합니다.

```js
async function showAvatar() {
  // JSON 읽기
  let response = await fetch("/article/promise-chaining/user.json");
  let user = await response.json();

  // github 사용자 정보 읽기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 아바타 보여주기
  let img = document.createElement("img");
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3초 대기
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 await를 사용할 수 있습니다.

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

await는 ‘thenable’ 객체를 받습니다.promise.then처럼 await에도 thenable 객체(then 메서드가 있는 호출 가능한 객체)를 사용할 수 있습니다. thenable 객체는 서드파티 객체가 프라미스가 아니지만 프라미스와 호환 가능한 객체를 제공할 수 있다는 점에서 생긴 기능입니다. 서드파티에서 받은 객체가 .then을 지원하면 이 객체를 await와 함께 사용할 수 있습니다.

await는 데모용 클래스 Thenable의 인스턴스를 받을 수 있습니다.

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000밀리초 후에 이행됨(result는 this.num*2)
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // 1초 후, 변수 result는 2가 됨
  let result = await new Thenable(1);
  alert(result);
}

f();
```

await는 .then이 구현되어있으면서 프라미스가 아닌 객체를 받으면, 내장 함수 resolve와 reject를 인수로 제공하는 메서드인 .then을 호출합니다(일반 Promise executor가 하는 일과 동일합니다). 그리고 나서 await는 resolve와 reject 중 하나가 호출되길 기다렸다가((\*)로 표시한 줄) 호출 결과를 가지고 다음 일을 진행합니다.

### 에러 핸들링

프라미스가 정상적으로 이행되면 await promise는 프라미스 객체의 result에 저장된 값을 반환합니다. 반면 프라미스가 거부되면 마치 throw문을 작성한 것처럼 에러가 던져집니다.

예시:

```js
async function f() {
  await Promise.reject(new Error("에러 발생!"));
}
```

위 코드는 아래 코드와 동일합니다.

```js
async function f() {
  throw new Error("에러 발생!");
}
```

실제 상황에선 프라미스가 거부 되기 전에 약간의 시간이 지체되는 경우가 있습니다. 이런 경우엔 await가 에러를 던지기 전에 지연이 발생합니다.

await가 던진 에러는 throw가 던진 에러를 잡을 때처럼 try..catch를 사용해 잡을 수 있습니다.

```js
async function f() {
  try {
    let response = await fetch("http://유효하지-않은-주소");
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

에러가 발생하면 제어 흐름이 catch 블록으로 넘어갑니다. 여러 줄의 코드를 try로 감싸는 것도 가능합니다.

```js
async function f() {
  try {
    let response = await fetch("http://유효하지-않은-url");
    let user = await response.json();
  } catch (err) {
    // fetch와 response.json에서 발행한 에러 모두를 여기서 잡습니다.
    alert(err);
  }
}

f();
```

try..catch가 없으면 아래 예시의 async 함수 f()를 호출해 만든 프라미스가 거부 상태가 됩니다. f()에 .catch를 추가하면 거부된 프라미스를 처리할 수 있습니다.

```js
async function f() {
  let response = await fetch("http://유효하지-않은-url");
}

// f()는 거부 상태의 프라미스가 됩니다.
f().catch(alert); // TypeError: failed to fetch // (*)
```

.catch를 추가하는 걸 잊으면, 처리되지 않은 프라미스 에러가 발생합니다(콘솔에서 직접 확인해 봅시다). 이런 에러는 프라미스와 에러 핸들링 챕터에서 설명한 전역 이벤트 핸들러 unhandledrejection을 사용해 잡을 수 있습니다.

async/await을 사용하면 await가 대기를 처리해주기 때문에 .then이 거의 필요하지 않습니다. 여기에 더하여 .catch 대신 일반 try..catch를 사용할 수 있다는 장점도 생깁니다. 항상 그러한 것은 아니지만, promise.then을 사용하는 것보다 async/await를 사용하는 것이 대개는 더 편리합니다.

그런데 문법 제약 때문에 async함수 바깥의 최상위 레벨 코드에선 await를 사용할 수 없습니다. 그렇기 때문에 관행처럼 .then/catch를 추가해 최종 결과나 처리되지 못한 에러를 다룹니다. 위 예시의 (\*)로 표시한 줄처럼 말이죠.
여러 개의 프라미스가 모두 처리되길 기다려야 하는 상황이라면 이 프라미스들을 Promise.all로 감싸고 여기에 await를 붙여 사용할 수 있습니다.

```js
// 프라미스 처리 결과가 담긴 배열을 기다립니다.
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

실패한 프라미스에서 발생한 에러는 보통 에러와 마찬가지로 Promise.all로 전파됩니다. 에러 때문에 생긴 예외는 try..catch로 감싸 잡을 수 있습니다.
