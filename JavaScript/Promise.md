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
