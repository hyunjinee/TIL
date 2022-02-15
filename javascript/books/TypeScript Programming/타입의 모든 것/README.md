# 3장 타입의 모든 것

타입(type)
값과 이 값으로 할 수 있는 일의 집합

- Boolean타입은 모든 불과 불에 수행할 수 있는 모든 연산의 집합이다.
- number타입은 숫자와 숫자에 적용할 수 있는 모든 연산, 숫자에 호출할 수 있는 모든 메서드의 집합이다.
- string 타입은 모든 문자열과 문자열에 수행할 수 있는 모든 연산, 문자열에 호출할 수 있는 모든 메서드의 집합이다.

## any

any는 타입들의 대부라고 할 수 있다. any로 뭐든지 할 수 있지만 꼭 필요한 상황이 아니라면 사용하지 않는 것이 좋다. 타입스크립트에서는 컴파일 타임에 모두가 타입이 있어야 하므로 프로그래머와 타입스크립트 둘다 타입을 알 수 없는 상황에서는 기본 타입인 any라고 가정한다. any는 최후의 보루로, 가급적 사용하지 않아야한다.
타입은 값과 값으로 수행할 수 있는 작업의 집합인데, any는 모든 값의 집합이므로 any는 모든 것을 할 수 있다. 즉 , any라는 타입의 값이 있으면 덧셈, 곱셈등 모든 작업을 할 수 있다. any를 사용하면 값이 자바스크립트처럼 동작하기 시작하면서 타입 검사기라는 마법이 더이상 작동하지 않는다.
any를 사용하려면 명시적으로 선언해야한다. 타입스크립트가 어떤 값을 any로 추론해야하는 상황이라면 편집기에 꼬불거리는 빨간 밑줄이 표시되면서 컴파일 타임 예외가 발생한다.
타입스크립트의 기본설정은 자유를 허용하므로 any로 추론되는 값을 발견하더라도 예외를 발생시키지 않는다. 그러나 암묵적인 any가 나타났을 때 예외를 일으키고 싶다면 tsconfig.json에서 noImplicityAny 플래그를 활성화한다. noImplicityAny는 stirct 패밀리에 속하므로 strict를 활성화했다면 따로 활성화 할 필요 없다.

## unknown

타입을 미리 알수 없는 값이 있을 때 any대신 unknown을 사용하면 좋다. any처럼 unknown도 모든 값을 대표하지만, unknown의 타입을 검사해 정제하기 전까지는 타입스크립트가 unknown타입의 값을 사용할 수 없게 강제한다. 타입스크립트가 무언가의 타입을 unknown이라고 추론하는 상황은 없다. unknown타입을 사용하고자 한다면 개발자가 명시적으로 설정해야한다. unknown타입이 아닌 값과 unknown타입인 값을 비교할 수 있다. 하지만 unknown 값이 특정 타입이라고 가정해서 해당 타입에서 지원하는 동작을 수행할 수는 없다. 먼저 타입스크립트에게 해당 값이 특정 타입임을 증명해야한다.

## boolean

불타입은 참거짓 두개의 값을 갖는다. 이타입으로는 비교연산과 반전연산을 할수 있을 뿐 많은 연산을 지원하지 않는다. 타입리터럴(오직 하나의 값을 나타내는 타입)

## number

number 타입은 모든 숫자의 집합이다. number타입에는 덧셈 뺄셈 모듈로 비교등 숫자관련 연산을 수행한다.

## bigint

bigint는 자바스크립트와 타입스크립트에 새로 추가된 타입으로 이를 이용하면 라운딩 관련 에러 걱정없이 큰 정수를 처리할 수 있다. number는 253까지의 정수를 표현할 수 있지만 bigint를 이용하면 이보다 큰 수도 표현할 수 있다. bigint타입은 모든 Bigint의 집합으로 덧벰, 뺄셈,곱셈,나눗셈,비교등의 연산을 지원한다.

## string

string 은 모든 문자열의 집합으로 연결, 슬라이스등의 연산을 수행할 수 있다. boolean과 number 처럼 string 타입도 네가지 방법으로 선언할 수 있으며 가능하다면 타입스크립트가 string 타입을 추론하도록 두는 것이 좋다.

## symbol

symbol은 ES2015에 새로 추가된 기능이다. 실무에서는 심벌을 자주 사용하지 않는 편이며 객체와 맵에서 문자열 키를 대신하는 용도로 사용한다. 심벌 키를 사용하면 사람들이 잘 알려진 키만 사용하도록 강제할 수 있으므로 키를 잘못 설정하는 실수를 방지한다. 객체의 기본 반복자(Symbol.iterator)를 설정하거나 객체가 어떤 인스턴스인지 (Symbol.hasInstance)를 런타임에 오버라이딩하는 것과 비슷한 기능을 제공한다. symbol타입으로는 할 수 있는 동작이 별로 없다.
자바스크립트에서 symbol('a')는 주어진 이름으로 새로운 symbol을 만든다는 의미다. 만들어진 symbol은 고유하여 다른 symbol과 ==또는===로 비교했을 때 같지 않다고 판단된다. 심지어 같은 이름으로 다른 symbol을 만들어도 마찬가지이다.

```typescript
const e = Symbol("e"); // typeof e
const f: unique symbol = Symbol("f"); //typeof f
let g: unique symbol = Symbol("f"); // 에러 TS1332: 'unique symbol'타입은 반드시 'const'이어야함
let h = e === e; //boolean
let i = e === f; //에러 TS2367 'unique symbol'타입은 서로 겹치는 일이 없으므로 이비교문의 결과는 항상 'false'
```

새 symbol을 선언하고 let이나 var이 아닌 const 에 할당하면 타입스크립트가 unique symbol 타입으로 추론한다. 코드 편집기에서는 unique symbol이 아니라 'typeof 변수명'형태로 보여줄 것이다.
const 변수의 타입을 unique symbol로 명시적으로 정의할 수 있다.
unique symbol 은 자신과 항상 같다.
unique symbol도 결국 1, true, 'literal'등 다른 리터럴 타입과 마찬가지로 특정 symbol을 나타내는 타입이다.

## 객체

타입스크립트의 객체타입은 객체의 형태를 정의한다. 타입스크립트는 객체 타입만으로는 {}로만단 간단한 객체와 new를 사용해 만든 복잡한 객체를 구분할 수 없다. 이는 자바스크립트가 구조기반 타입을 갖도록 설계되었기 때문이다. 따라서 타입스크립트도 이름 기반 타입스타일(nominal type)보다는 자바스크립트 스타일을 선호한다.

구조 기반 타입화
구조 기반 타입화에서는 객체의 이름에 상관없이 객체가 어떤 프로퍼티를 갖고 있는지를 따진다. (이름 기반 타입에서는 이름을 따진다.) 일부 언어에서는 덕 타이핑(duck typing)이라고 한다.
타입스크립트에서 객체를 서술하는데 타입을 이용하는 방식은 여러가지다.
첫번째로는 값을 object로 선언하는 것이다.

```typescript
let a: object = {
  b: "x",
};
console.log(a.b);
```

위 문장에서 a.b를 찍으려하면 에러가 난다. ('b'프로퍼티는 'object'에 존재하지 않음이라는 에러)
object 타입은 any보다 조금 더 좁은 타입이다. object는 서술하는 값에 관한 정보를 거의 알려주지 않으며, 값 자체가 자바스크립트 객체라고 (그리고 null이 아니라고 )말해줄 뿐이다. 명시적으로 정의하지 않고 타입스크립트가 추론하게 한다면??

```typescript
let a = {
  b: "x",
};
a.b; // string

console.log(a.b);

let b = {
  c: {
    d: "f",
  },
}; // {c: {d: string}}
```

타입스크립트가 c의 형태를 추론하게 하거나 중괄호 안에서 명시적으로 타입을 묘사할 수 있다.

### 인덱스 시그니처(index signature)

[key: T]: U 와 같은 문법을 인덱스 시그니처라 부르며 타입스크립트에 어떤 객체가 여러 키를 가질수 있음을 알려준다. 이 객체에서 모든 T타입의 키는 U 타입을 갖는다.라고 해석가능하다. 인덱스 시그니처를 이용하면 명시적으로 정의한 키외에 다양한 키를 객체에 안전하게 추가할 수 있다. 인덱스 시그니처의 키(T)는 반드시 number나 string 타입에 해당할 수 있는 타입이어야한다. (자바스크립트 객체는 문자열을 키의 타입으로 사용한다. 배열은 숫자키를 사용하는 객체의 일종이다.) 인덱스 시그니처의 키 이름은 원하는 이름을 가져다 바꿔도 된다. 즉 key가 아니어도 된다.

```typescript
let airplaneSeatingAssignments: {
  [seatNumber: string]: string;
} = {
  "34D": "Boris Cherny",
  "34E": "Bill Gates",
};
```

객체 타입을 정의할 때 선택형(?)만 사용할 수 있는 것은 아니다. 필요하면 readonly한정자를 이용해 특정 필드를 읽기 전용으로 정의할 수 있다. (즉, 정의한 필드에 초깃값을 할당한 다음에는 그 값을 바꿀 수 없다. 객체 프로퍼티에 const 를 적용한 듯한 효과를 낸다.)

```typescript
let user: {
  readonly firstName: string;
} = {
  firstName: "abby",
};
user.firstName; //string
user.firstName = "abbey with an e"; //error 'firstName'은 읽기 전용 프로퍼티이므로 할당할 수 없음
```

객체 리터럴 표기법에는 빈 객체 타입이라는 특별한 상황이 존재한다. null과 undefined 를 제외한 모든 타입은 빈객체 타입에 할당할 수 있으나, 이는 사용하기 까다롭게 만든다. 따라서 빈객체는 피하는 것이 좋다.

## 타입 별칭, 유니온, 인터섹션

타입 별칭
(let, const ,var)로 변수를 선언해서 값 대신 변수로 칭하듯이 타입별칭으로 타입을 가리킬 수 있다.

```typescript
type Age = number;
type Person = {
  name: string;
  age: Age;
};
```

Age는 number이다. 타입 별칭을 이용하면 Person형태를조금더 이해하기 쉽게 정의할 수 있다. 타입스크립트는 별칭을 추론하지는 않으므로 반드시 별칭의 타입을 명시적으로 정의해야한다.

```typescript
let age: Age = 55;
let driver: Person = {
  name: "James",
  age: age,
};
```

타입 별칭은 프로그램의 논리에 영향을 미치지 않고 별칭이 가리키는 타입으로 대치할 수 있다.
자바스크립트의 변수선언(let,const,var)과 마찬가지로 하나의 타입을 두번 정의할 수 없다.

```typescript
type Color = "red";
type Color = "blue"; // 에러 'Color'식별자를 중복 정의함
```

let 과 const 처럼 타입 별칭도 블록 영역에 정용된다. 모든 블록과 함수는 자신만의 영역을 가지므로 내부에 정의한 타입 별칭이 외부의 정의를 덮어쓴다. (shadowing)

```typescript
type Color = "red";
let x = Math.random() < 0.5;
if (x) {
  type Color = "blue";
  let b: Color = "blue";
} else {
  let c: Color = "red";
}
```

타입 별칭은 복잡한 타입을 DRY 하지 않도록 해주며 변수가 어떤 목적으로 사용되었는지 쉽게 이해할 수 있게 도와준다. (어떤 사람들은 변수명으로 설명하는 것보다 타입명으로 설명하는 것을 선호한다.) 값을 변수로 할당할지를 결정하는 것과 같은 기준으로 타입 별칭을 사용할지 여부를 결정할 수 있다.

### 유니온과 인터섹션 타입

A,B라는 두 사물이 있을 때 이를 유니온(합집합)하면 둘을 합친 결과가 나오며 인터섹션하면 교칩합이 결과로 나온다. 타입스크립트는 타입에 적용할 수 있는 특별한 연산자인 유니온(|)과 인터섹션(&)을 제공한다. 타입은 집합과 비슷하므로 집합처럼 연산을 수행할 수 있다.

```typescript
type Cat = { name: string; purrs: boolean };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;
```

CatOrDogOrBoth는 문자열 타입의 name프로퍼티가 있다는 사실을 알 수 있다. 또한 Cat,Dog 또는 둘다 할당할 수 있다.

## 배열

자바스크립트처럼 타입스크립트 배열도 연결(concatenation), 푸시(push), 검색(searching), 슬라이스(slicing) 등을 지원하는 특별한 객체이다.

```typescript
let a = [1, 2, 3]; // number[]
let b = ["a", "b"]; // string[]
let c: string[] = ["a"]; // string[]
let d = [1, "a"]; // (string | number)[]
const e = [2, "b"]; // (string | number)[]
let f = ["red"];
f.push("blue");
f.push(true); // 에러 'true' 타입 인수를 'string'타입 매개변수에 할당 할 수 없다.

let g = []; // any[]
g.push(1); // number[]
g.push("red"); // (string | number)[]

let h: number[] = []; // number[]
h.push(1); // number[]
h.push("red"); // 에러 'red'타입 인수를 'number'타입 매개변수에 할당할 수 없음
```

타입스크립트는 T[]와 Array<T> 라는 두가지 배열 문법을 지원한다. 성능, 의미상 두 표현은 같다. 더 간결한 T[]문법을 사용하지만 취향대로 사용할 수 있다.

배열이 정의된 영역을 벗어나면 (예: 함수안에서 배열을 선언하고 이를 반환) 타입스크립트는 배열을 더이상 확장할 수 없도록 최종 타입을 할당한다.

```typescript
function buildArray() {
  let a = []; // any[]
  a.push(1);
  a.push("x");
  return a; // (string | number)[]
}
let myArray = buildArray(); // (string | number)[]
myArray.push(true); //에러  'true'타입 변수는 위 타입의 매개변수에 할당할 수 없음
```

## tuple

튜블은 배열의 서브 타입이다. 튜플은 길이가 고정되었고, 각 인덱스의 타입이 알려진 배열의 일종이다. 다른 타입과 달리 튜플은 선언할때 타입을 명시해야한다. 자바스크립트에서 배열과 튜플에 같은 문법을 사용하는데 타입스크립트에서는 대괄호를 배열 타입으로 추론하기 때문이다.

```typescript
let a: [number] = [1];
// [이름,성씨, 생년] 튜플
let b: [string, string, number] = ["malcolm", "gladwell", 1963];
let trainFares: [number, number?][] = [[3.75], [8.25, 7.7], [10.5]];
//다음과 같음
let moreTrainFares: ([number] | [number, number])[] = [
  //...
];
```

또한 튜플이 최소 길이를 갖도록 지정할 때는 나머지 요소(...)를 사용할 수 있다.

```typescript
let friends: [string, ...string[]] = ["sara", "tali", "chloe", "claire"]; // 이형배열
let list: [nubmer, boolean, ...string[]] = [1, false, "a", "b", "c"];
```

튜플은 이형배열을 안전하게 관리할 뿐 아니라 배열타입의 길이도 조절한다. 이런 기능을 잘 활용하면 순수 배열에 비해 안정성을 높일 수 있으므로 튜플 사용을 권장한다.

### 읽기 전용 배열과 튜플

일반 배열은 가변(mutable 즉 push slice, 갱신등의 작업을 자유롭게 수행가능)인 반면, 상황에 따라서는 불변(immutable; 즉 한번 배열을 만들어 내용을 추가한 이후로는 내용을 바꿀 수 없는 )배열이 필요할 수 있다.타입스크립트는 readonly배열 타입을 기본으로 지원하므로 이를 이용해 불변 배열로 바로 만들 수 있다. 읽기 전용배열은 일반 배열과 같지만 내용을 갱신할 수 없다는 점만 다르다. 읽기 전용배열은 명시적 타입 어노테이션으로 만들 수 있다. 읽기전용 배열을 갱신하려면 .push, .splice 처럼 내용을 바꾸는 동작 대신, .concat, .slice와 같이 내용을 바꾸지 않는 메서드를 사용해야한다.
타입스크립트는 Array처럼 읽기 전용 배열과 튜플을 만드는 긴 형태의 선언 방법을 지원한다.

```typescript
type A = readonly string[]; //readonly string[]
type B = ReadonlyArray<string>; //readonly string[]
type C = Readonly<string[]>; //readonly string[]
type D = readonly [number, string]; // readonly [number, string]
type E = Readonly<[number, string]>; //readonly [number, string]
```

어떤 문법을 사용할지는 개발자 기호에 달려있다.
읽기 전용 배열은 바꿀수 없으므로 코드를 쉡게 이해할 수 있는 장점이 있지만 결국 자바스크립트 배열로 구현한 것이다. 즉 스프레드(...)나 .slice등으로 배열을 조금만 바꿔도 우선 원래 배열을 복사해야 하므로, 주의하지 않으면 응용프로그램의 성능이 느려질 수 있다. 작은 배열에서는 이런 오버헤드가 사소해 보일수 있지만 큰배열에서는 눈에 띄게 큰 성능 저하를 일으킬 수 있다.

## null, indefined, void, never

타입스크립트는 null,undefined 두가지 값으로 부재를 표현한다. undefined는 아직정의하지 않았음을 의미하는 반면 null은 값이 없다는 의미이다. ts는 never,void도 제공한다. 이들은 존재하지 않음의 특징을 조금 더 세밀하게 분류하는 정말 특수하고 특별한 용도의 타입이다. void는 명시적으로 아무것도 반환하지 않는 함수의 반환 타입을 가르키며 never는 절대 반환하지 않는 (예외를 던지거나 영원히 실행되는)함수 타입을 가리킨다.
unknown 이 모든 타입의 상위타입이라면 never은 모든 타입의 서브타입이다. 즉, 모든 타입에 never을 할당할 수 있으며 never 값은 어디서든 안전하게 사용할 수 있다.

## 열거형

열거형 enum은 해당 타입으로 사용할 수 있는 값을 열거하는 기법이다. 열거형은 키를 값에 할당하는, 순서가 없는 자료구조다. 키가 컴파일 타임에 고정된 객체라고 생각하면 쉽다. 따라서 ts는 키에 접근할 때 주어진 키가 실제 존재하는지 확인할 수 있다.
타입스크립트는 자동으로 열거형의 각 멤버에 적절한 숫자를 추론해 할당하지만, 값을 명시적으로 설정할 수도 있다.

```ts
enum Language {
  English = 0,
  Spanish = 1,
  Russian = 2,
}
```

보통의 객체에서 값을 가져올 때 처럼 괄호또는 점 표기법으로 열거형 값에 접근할 수 있다.

```ts
let myFirstLanguage = Language.Russian;
let mySecondLanguage = Language["English"];
```

```ts
enum Language {
  English = 100,
  Spanish = 200 + 300,
  Russian, // 타입스크립트가 500다음 숫자인 501로 추론
}
```
