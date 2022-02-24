# Promise

운영체제가 제공하는 서비스를 API라고 합니다. API는 타입스크립트와 같은 프로그래밍 언어의 함수 형태로 제공됩니다. 그런데 API는 일반함수와달리 하드디스크에 저장된 파일을 읽는 등 실행 시물리적인 시간이 소요됩니다.

따라서 파일 내용을 모두 읽을 때까지 프로그램의 동작을 잠시 멈추는 동기 방식의 API와 프로그램의 동작을 멈추지 않는 대신 결과를 콜백함수로 얻게 하는 비동기 방식의 API를 제공합니다.

비동기 API의 콜백 함수를 특별히 비동기 콜백함수라고 합니다. 비동기 콜백 함수는 일반 함수와 달리 API의 물리적인 동작 결과를 수신하는 목적으로만 사용됩니다.

노드는 웹 브라우저와 달리 운영체제 파일 시스템에 있는 파일을 읽을 수 있습니다. readFileSync는 파일을 읽어서 Buffer라는 타입으로 전달해줍니다. Buffer은 노드가 제공하는 클래스로서 바이너리 데이터를 저장하는 기능을 수행합니다. Buffer의 데이터를 문자열로 만들려고 할 때는 Buffer의 toString 메서드를 사용합니다. readFile은 비동기 API입니다.

스레드는 CPU가 프로그램을 동작시키는 최소 단위입니다. 운영체제에서 프로그램이 실행되고 있는 상태일 때를 프로세스라고 합니다. 프로세스는 한개의 주 스레드와 여러개의 작업 스레드를 동작시킵니다. 자바스크립트 코드는 항상 한 개의 작업 스레드에서 실행됩니다. 웹 브라우저나 노드 프로그램 자체는 다중 스레드로 동작하지만 자바스크립트 코드는 한개의 작업 스레드, 즉 단일 스레드에서 동작합니다.

동기 API는 프로그램의 반응성을 떨어뜨립니다. 만일 동기 API를 호출하는 자바스크립트 코드가 웹서버에서 실행되면 단일스레드로 동작하는 자바스크립트의 물리적인 특성상 웹 서버는 동기 API가 결괏값을 반환할 때까지 일시적으로 멈춥니다.

Promise는 콜백지옥이라고 불리는 구조를 좀 더 다루기 쉬운 형태의 코드로 만들려는 목적으로 고안되었습니다.
Promise는 ES5에서 정식으로 채택되었습니다. Promise는 클래스입니다. 따라서 Promise클래스를 사용하려면 일단 new 연산자를 적용해 프로미스 객체를 만들어야 합니다. 그리고 new 연산자로 프로미스 객체를 만들때 다음처럼 콜백함수를 제공해야합니다.

```typescript
const promise = new Promise(콜백함수);
```

여기서 Promise의 콜백함수는 resolve와 reject라는 두개의 매개변수를 가집니다.

```typescript
new Promise<T>((
  resolve: (successValue: T) => void,
  reject: (any) => void
)) => {
  //코드구현
}
```

Promise 클래스는 resolve 라는 클래스 메서드 (정적메서드) 를 제공합니다. 앞서 Promise 객체를 생성할 때 resolve함수를 호출했는데, Promise.resolve는 이를 클래스 메서드로 구현한 것 입니다. Promise.resolve(여러분의 값) 형태로 호출하면 항상 이 '값'은 then 메서드에서 얻을 수 있습니다.

Promise의 then인스턴스 메서드를 호출할때 사용한 콜백함수는 값을 반환할 수 있습니다.
이 then 에서 반환된 값은 또 다른 then 메서드를 호출해 값을 수신할 수 있습니다. then메서드는 반환값이 Promise타입이면 이를 해소(resolve)한 값을 반환합니다. 만약 reject당한 값일 때는 catch 메서드에서 이 거절당한 값을 얻을 수 있습니다. Promise 객체에 then 메서드를 여러번 호출하는 코드 형태를 then chain 이라고 합니다.

**Promise all method**

Array 클래스는 every라는 이름의 인스턴스 메서드를 제공합니다. every메서드는 배열의 모든 아이템이 어떤 조건을 만족하면 true를 반환합니다. Promise 클래스는 앞 every 처럼 동작하는 all 이라는 이름의 클래스 메서드를 제공합니다.

all(프로미스 객체 배열:Promise[]): Promise<해소된 값들의 배열 혹은 any>

Promise.all 메서드는 Promise 객체들을 배열 형태로 받아 모든 객체를 대상으로 해소된 값들의 배열로 만들어줍니다.

배열에 담긴 Promise객체중 거절 객체가 발생하면 더 기다리지 않고 해당 reject value를 담은 Promise.reject객체를 반환합니다.

Promise.race 클래스 메서드는 배열에 담긴 프로미스 객체중 하나라도 resolve되면 이값을 담은 Promise.resolve객체를 반환합니다. 만일 거절 값이 가장 먼저 발생하면 Promise.reject객체를 반환합니다.

```typescript
Promise.race([Promise.resolve(true), Promise.resolve("heelo")]).then((value) => console.log(value)); // true

Promise.race([Promise.resolve(true), Promise.reject(new Error("heelo"))])
  .then((value) => console.log(value))
  .catch((error) => console.log(error.message)); // 호출되지 않음

Promise.race([Promise.reject(new Error("error")), Promise.resolve(true)])
  .then((value) => console.log(value)) // 호출되지 않음
  .catch((error) => console.log(error.message)); // error
```

Promise는 비동기 API 사용에서 나타나는 콜백 지옥 형태의 코드를 어느 정도 관리할 수 있는 코드 형태로 바꿔줍니다.그런데 ESNext 자바스크립트와 타입스크립트는 Promise를 좀더 쉬운 형태의 코드로 만들 수 있게 하는 async/await 구문을 제공합니다.

await 키워드는 피연산자의 값을 반환해 줍니다. 그런데 만약 피연산자가 Promise 객체이면 then 메서드를 호출해 얻은 값을 반환해 줍니다.

async 함수는 값을 반환할 수 있습니다. 이 때 반환값은 Promise 형태로 반환되므로 다음처럼 then메서드를 호출해 async 함수의 반환 값을 얻어야합니다. **async 는 Promise를 반환한다.!!!!**

```typescript
const asyncReturn = async () => {
  return [1, 2, 3];
};

asyncReturn().then((value) => console.log(value)); // [1, 2, 3]
// async함수는 Promise를 반환합니다.
```
