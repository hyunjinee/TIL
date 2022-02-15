# 함수

## 함수 선언과 호출

자바스크립트에서 함수는 일급객체이다. 즉, 객체를 다루듯이 함수를 변수에 할당하거나, 함수를 다른 함수로 전달하거나, 함수에서 함수를 반환하거나, 객체와 프로토타입에 할당하거나, 함수에 프로퍼티를 기록하거나, 함수에 기록된 프로퍼티를 읽는 등의 작업을 할 수 있다. 자바스크립트에서는 함수로 할 수 있는 일이 정말 많은데 덕분에 타입스크립트는 이 모든 것을 자신의 풍부한 타입시스템에 녹여냈다.

매개변수(parameter)는 함수 선언의 일부이며 함수를 실행하는데 필요한 데이터 조각이다. 정형매개변수(formal parameter)라고도 부른다. 인수(argument)는 함수를 호출할 때 전달해야 하는 데이터 조각이다. 실질 매개변수(actual parameter)라고도 부른다.

객체와 튜플 타입에서처럼 함수에서도 ?를 이용해 선택적 매개변수를 지정할 수 있다. 함수의 매개변수를 선언할 때 필수 매개변수를 먼저 지정하고 선택적 매개변수를 뒤에 추가한다.

```ts
function log(message: string, userId?: string) {
  let time = new Date().toLocaleTimeString();
  console.log(time, message, userId || "Not signed in");
}
log("Page loaded");
log("User signed in", "da763be");
```

js에서처럼 매개변수에 기본값을 지정할 수 있다. 의미상으로는 호출자가 해당 매개변수에 값을 전달하지 않아도 되므로 매개변수를 선택적으로 만드는 것과 같다.(선택적 매개변수는 뒤에와야 하지만 기본 매개변수는 어디에나 추가할 수 있다는 점이 다르다.)
예를 들어서 log를 다음처럼 다시 구현할 수 있다.

```ts
function log(message: string, userId = "Not signed in") {
  let time = new Date().toISOString();
  console.log(time, message, userId);
}
```

userId에 기본값을 제공하므로 선택형 마크(?)와 타입을 지정할 필요가 없어졌다. 영리한 타입스크립트는 기본값으로 매개변수의 타입을 추론할 수 있기 때문이다. 덕분에 코드가 간결해지고 읽기도 쉬워진다. 물로 일반 매개변수에 타입을 지정하듯이 기본 매개변수에도 타입을 명시할 수 있다.

```ts
type Context = {
  appId?: string;
  userId?: string;
};

function log(message: string, context: Context = {}) {
  let time = new Date().toISOString();
  console.log(time, message, context.userId);
}
```

실무에서는 선택적 매개변수보다 기본 매개변수를 더 자주 사용하게 된다.

인수를 여러개 받는 함수라면 그 목록을 배열 형태로 건넬 수도 있다.

```ts
function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
sum([1, 2, 3]);
```

때로는 고정인자 API가 아니라 가변인자 API가 필요할 때도 있다. 전통적으로 자바스크립트는 요술 같은 arguments객체를 통해 이기능을 제공했다. 자바스크립트 런타임이 함수에 자동으로 arguments를 정의해 개발자가 함수로 전달한 인수목록을 할당한다는 점에서 '요술'같은 일이다.arguments는 일종의 배열(순수한 배열은 아님) .reduce와 같은 내장 기능을 사용하려면 진짜 배열로 변환해야한다.

```ts
function sumVariadic(): number {
  return Array.from(arguments).reduce((total, n) => total + n, 0);
}
```

하지만 arguments에는 한가지 큰 문제가 있다. 전혀 안전하지 않다는 점이다.
ts는 total, n 모두 any타입으로 추론했고 인수를 받지 않도록 선언했으므로 이 함수를 호출하면 타입스크립트 입장에서는 인수를 받을 수 없다면서 TypeError를 발생시킨다.
그럼어떻게 안전한 타입의 가변인수 함수를 만들 수 있을까?
나머지 매개변수(rest parameters)로 이 문제를 해결할수 있다. 안전하지 않은 arguments를 사용하는 대신 나머지 매개변수를 이용해 sum함수가 안전하게 임의의 인수를 받게 만든다.

```ts
function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
```

기존 함수와 달라진부분은 sum함수의 매개변수 목록에 ...이 추가 된 것뿐이지만 타입 안정성을 갖춘 함수가 만들어졌다.

함수는 최대 한개의 나머지 매개변수를 가질수 있으며 나머지 매개변수는 함수의 매개변수 목록 맨 마지막에 위치해야한다. 예를 들어 타입스크립트의 내장기능인 `console.log`선언을 살펴보자.

```ts
interface Console {
  log(message?: any, ...optionalParams: any[]): void;
}
```

### call, apply, bind

함수를 괄호 ()로 호출하는 방법도 있지만 자바스크립트에서는 두가지 방법을 추가로 제공한다.

```ts
function add(a: number, b: number): number {
  return a + b;
}
add(10, 20);
add.apply(null, [10, 20]);
add.call(null, 10, 20);
add.bind(null, 10, 20)();
```

apply는 함수 안에서 값을 this로 한정하며 두번째 인수를 펼쳐 함수에 매개변수로 전달한다. call도 같은 기능을 수행하지만 인수를 펼쳐 전달하지 않고 순서대로 전달한다는 점만다르다.
비슷한 방법으로 bind도 this인수를 함수의 인수목록으로 한정한다. 다른 점은 bind도 this인수를 함수의 인수 목록으로 한정한다. 다른 점은 bind는 함수를 호출하지 않고 새로운 함수를 반환하는데, 개발자는 ()나 call을 이용해 반환된 함수를 호출하거나 apply로 아직 한정되지 않은 매개변수를 추가로 전달할 수 있다.

> TSC 플래그: strictBindCallApply 코드에서 .call, .apply, .bind 를 안전하게 사용하려면 tsconfig.json에서 strictBindCallApply를 활성화해야한다. (strict 모드를 이미 활성화했다면 이옵션은 자동으로 활성화 된다.)

this의 타입
자바스크립트를 사용해보지 않은 독자라면 자바스크립트에서 this변수가 클래스에 속한 메서드들 뿐 아니라 모든 함수에서 정의된다는 사실에 놀랄 것이다.this의 값은 함수를 어떻게 호출했는지에 따라 달라지는데 이는 자바스크립트 코드를 이해하기 어렵게 만드는 고질적인 문제중하나다.
따라서 많은 개발팀은 클래스 메서드를 제외한 다른 모든곳에서 this사용을 금한다. TSLint 규칙에서 no-invalid-this를 활성화하면 여러분 코드에 이런 this가 침투하는 일을 방지한다.

this가 자주 문제를 일으키는 원인은 바로 그 할당 방법에 있다. 메서드를 호출할 때 this는 점 왼쪽의 값을 갖는다는 것이 일반적인 원칙이다.다음 예를 살펴보자

```ts
let x = {
  a() {
    return this;
  },
};
x.a();
```

하지만 호출이 일어나기 전 어느 시점에서 a를 다시 할당하면 결과가 달라진다.

```ts
let a = x.a;
a();
```

다음처럼 날짜의 타입을 포매팅하는 유틸리티 함수가 있다고 가정하자.

```ts
function fancyDate() {
    return ${this.getDate()} / ${this.getMonth()}/${this.getFullYear()}
}
```

그리고 이 API는 아주 오래전에 설계했다고 하자. 이버전의 fancyDate 를 호출하면 this로 한정할 Date를 제공해야한다. fancyDate.call(new Date) 깜빡하고 Date 를 한정하지 않으면 런타임 예외가 발생한다.

`fancyDate() // 처리되지 않은 TypeError: this.getDate는 함수가 아님`

우리가 기대하는 this타입을 함수의 첫 번째 매개변수로 선언하자. 그러면 함수 안에 등장하는 모든 this가 우리가 의도한 this가 됨을 타입스크립트가 보장한다. 함수 시그니처에 사용한 this는 예약어이므로 다른 매개변수와 완전히 다른 방식으로 처리한다.

```ts
function fancyDate(this: Date) {
    return ${this.getDate()} / ${this.getMonth()}/${this.getFullYear()}
}
```

이렇게 수정한 fancyDate를 호출하면 다음과 같은 일이 벌어진다.
fancyDate.call(new Date)
fancyDate // 에러 void 타입의 this를 메서드에 속한 Date타입의 this에 할당 할 수 없음

타입스크립트에 많은 정보를 제공한 덕분에 런타임 에러 대신 컴파일 타임에 경고를 시작했다.

`TSC 플래그 noImplicitThis tsconfig.json 에서 noImplicitThis 를 활성화하면 함수에서 항상 this 타입을 명시적으로 설정하도록 강제할 수 있다. 단, noImplicitThis 는 클래스와 객체의 함수에는 this를 지정하라고 강제하지 않는다.

#### 제너레이터 함수 (줄여서 제너레이터)

제너레이터 함수는 여러개의 값을 생성하는 편리한 기능을 제공한다. 제너레이터 함수를 이용하면 값을 생산하는 속도를 정교하게 조절할 수 있다. 제너레이터 함수는 게으르게 동작 ,즉 소비자가 요청해야만 다음 값을 계산 하기 때문에 무한의 목록 생성하기 같은 까다로운 기능을 제공할 수 있다.

```ts
function* createFibonacciGenerator() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }

}

let fibonacciGenerator = createFibonacciGenerator()

  fibonacciGenerator.next() // {value:0, done: false}
  fibonacciGenerator.next() // {value:1, done:false}
  ...
```

함수 앞에 붙은 별표는 이 함수가 제너레이터임을 의미한다. 제너레이터를 호출하면 이터러블 반복자가 반환된다.

제너레이터는 영구적으로 값을 생성할 수 있다
제너레이터는 yield라는 키워드로 값을 방출한다. 소비자가 제너레이터에 다음 값을 요청하면, yield를 이용해 결과를 소비자에게 보내고, 소비자가 다음 값을 다시 요청하기 전까지는 실행을 중지한다. 이런 방식으로 동작하므로 while 루프가 영원히 실행되다가 비정상 종료되는 상황이 일어나지 않는다. 앞 코드의 createFibonacciGenerator 함수는 IterableIterator 를 반환하고, 이 제너레이터에 next를 호출할 때마다 다음 피보나치 값을 계산해서 결과를 방출한다. 타입스크립트가 방출된 값의 타입을 이용해 반복자의 타입을 추론함을 알수 있다.
다음 예처럼 IterableIterator 에서 방출하는 타입을 감싸서 제너레이터의 타입을 명시하는 방법도 있다.

```ts
function* createNumbers(): IterableIterator<number> {
  let n = 0;
  while (1) {
    yield n++;
  }
}

let numbers = createNumbers();
numbers.next(); // {value: 0, done: false}
numbers.next(); // {value: 1, done: false}
```

반복자(iterator)와 제너레이터는 상생관계다. 제너레이터로 값의 스트림을 생성할 수 있고 반복자로 생성된 값을 소비할 수 있기 때문이다.

> 이터러블(iterable;반복할 수 있는)
> Symbol.iterator 라는 프로퍼티 (반복자를 반환하는 함수)를 가진 모든 객체

> 반복자(iterator)
> next라는 메서드(value, done두 프로퍼티를 가진 객체를 반환)를 정의한 객체

TSC 플래그: downlevelIteration
타입스크립트 ES2015 이전 버전의 자바스크립트로 컴파일 할 때는 tsconfig.json에서 downlevelIteration 플래그로 커스텀 반복자를 활성화 할 수 있다. 응용 프로그램의 번들 크기가 커지는 것을 원하지 않으면 downlevelIteration을 비활성화하는 것이 좋다. 예전 환경에서 커스텀 반복자를 지원하려면 많은 코드가 필요하기 대문이다.

함수의 타입은 뭘까? 당연히 Function이다. 근데 이렇게쓰면 무슨인자를 받고 무슨 인자를 뱉는지도 모른다. 따라서 좀더 자세하게 쓰면, `(a:number, b:number)=> number`로 쓸 수 있다. 이 코드는 타입스크립트의 함수 타입 문법으로, 호출 시그니처또는 타입 시그니처라고 부른다. 이 문법은 화살표함수와 아주 비슷하다는 점을 알수 있는데 이는 의도된 것이다. 함수에 함수를 인수로 전달하거나 함수에서 다른함수를 반환하는 경우 이문법으로 인수나 반환 함수의 타입을 지정할 수 있다.
함수 호출 시그니처는 타입 수준의 코드, 즉 값이 아닌 타입 정보만 포함한다. 이는 함수 호출 시그니처로 매개변수 타입, this타입 반환 타입, 나머지 타입, 조건부 타입을 표현할 수 있지만 기본값은 표현할 수 없다. 기본값은 타입이 아니라 값이므로.. 함수 호출 시그니처는 바디를 포함하지 않아 타입스크립트가 타입을 추론할 수 없으므로 반환타입을 명시해야한다.

> 타입 수준 코드와 값 수준 코드
> 정적 타입 프로그래밍에서 사람들은 타입수준, 값 수준이라는 용어를 자주 사용하는데 이들은 공용어휘이다.
> 이 책에서 사용하는 타입 수준 코드는 타입과 타입연산을 포함하는 코드를 의미한다. 반면 값 수준 코드는 그 밖의 모든 것을 가리킨다. 어떤 코드가 유효한 자바스크립트 코드라면 이는 값수준이고, 유효한 자바스크립트 코드는 아니지만 유효한 타입스크립트 코드라면 타입수준으로 쉽게 구분할 수 있다.

제네릭 타입 매개변수: 여러 장소에 타입 수준의 제한을 적용할 때 사용하는 플레이스 홀더 타입. 다형성 타입 매개변수라고도 부른다.

함수의 선택적 매개변수처럼 기본 타입을 갖는 제네릭은 반드시 기본타입을 갖지않는 제네릭의 뒤에 위치해야한다.

```ts
type MyEvent2<Type extends string, Target extends HTMLElement = HTMLElement,> = { 
  target: Target,
  type: Type
}
```

강력한 타입 시스템은 큰 힘을 안겨준다. 그래서 타입스크립트로 코드를 구현할 때에는 타입을 추종하는 자신을 발견하게 될것이다. 사람들은 이를 타입 주도 개발이라고 부른다.

> Type driven development
> 타입 시그니처를 먼저 정하고 값을 나중에 채우는 프로그래밍 방식

표현식이 수용할 수 있는 값의 타입을 제한하는 것이 정적 타입 시스템의 핵심이다. 표현력이 더 풍부한 타입시스템일수록 표현식 안의 값을 더 잘 설명할 수 있다. 표현력이 높은 타입시스템을 함수에 적용하면 함수 타입 시그니처를 통해 함수에 관하여 원하는 거의 모든 정보를 얻을 수 있다.

```ts
function map<T, U> (array: T[], f: (item: T)=> U): U[] {

}
```
위는 map함수의 타입시그니처이다. 이전에 map을 본 적이 없더라도 이 시그니처를 보고map 이 어떤 동작을 하는지 어느정도 감을 잡을 수 있다. map 함수는 T배열, 그리고 T를 U로 매핑하는 함수를 인수로 받아서 U배열을 반환한다. 함수의 구현을 전혀 확인하지 않고도 이 정보들을 확인할 수 있다. 


