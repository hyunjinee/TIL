# 객체 프로퍼티 설정과 프락시

## 21.1 접근자 프로퍼티 getter와 setter

객체 프로퍼티에는 데이터 프로퍼티와 접근자프로퍼티가 있다.
접근자 프로퍼티는 메서드와 비슷한데, getter와 setter 두가지 함수로 구성된다는 것과 접근했을 때 함수라기 보다는 데이터 프로퍼티와 비슷하게 동작한다는점이 조금다르다. 이런면에서 접근자 프로퍼티를 동적 프로퍼티라고 부른다.

```javascript
const USER_EMAIL = Symbol();
class User {
  setEmail(value) {
    if (!/@/.test(value)) throw new Error(`invalid email: ${value}`);
    this[USER_EMAIL] = value;
  }
  getEmail() {
    return this[USER_EMAIL];
  }
}
```

잘못된 이메일 주소가 저장되는 것을 막기위해 위와 같이한다. 프로퍼티에는 심볼을 써서 실수로 접근하는 일을 막았다.접근자 프로퍼티를 이용해서 다시 만들어보자.

```javascript
const USER_EMAIL = Symbol();
class User {
  set email(value) {
    if (!/@/.test(value)) throw new Error(`invalid email: ${value}`);
    this[USER_EMAIL] = value;
  }
  get email() {
    return this[USER_EMAIL];
  }
}
```

함수를 두개사용했지만 두함수는 email프로퍼티 하나에 묶였다. 프로퍼티에 할당할 때는 setter가 노출되고, 할당하는 값이 첫번째 매개변수로 전달된다. 프로퍼티를 평가할 때는 getter가 호출된다.
setter없이 getter만 만들수도 있다.

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get perimeter() {
    return this.width * 2 + this.height * 2;
  }
}
```

반대로 getter없이 setter만 만들수도 있지만 거의 사용하지 않는다.

### 객체 프로퍼티 속성

프로퍼니에는 항상 키가 있고, 키는 문자열이나 심볼일 수 있다. 프로퍼티의 값은 어떤 타입이든 괜찮다. 배열이나 맵과 달리 객체의 프로퍼티에는 순서가 없다. 객체 프로퍼티에 접근할 때는 점 연산자나 대괄호 연산자를 사용한다. 객체 프로퍼티에 접근 할 때는 점 연산자나 대괄호 연산자를 사용한다. 마지막으로, 객체 프로퍼티는 식별자를 키로 사용하는 일반적인 프로퍼티, 심볼이나 표현식을 사용하는 계산된 프로퍼티, 메서드 단축 표기의 세가지가 있다. 프로퍼티에는 자신이 속한 객체안에서 어떻게 동작할지 결정하는 속성이 있다.

```javascript
const obj = { foo: "bar" };
Object.getOwnPropertyDescriptor(obj, "foo");
```

결과는 { value: 'bar', writable: true, enumerable: true, configurable: true
}와 같다.
프로퍼티 속성, 프로퍼티 서술자, 프로퍼티 설정은 모두 같은 것을 가리키는 용어며 섞어써도 무방하다.
쓰기 가능한지 writable
프로퍼티 값을 바꿀수 있는지 아닌지 판단한다.
나열 가능한지 enumerable
for...in 문이나 Object.keys, 확산 연산자에서 객체 프로퍼티를 나열할 때 해당 프로퍼티가 포함될지 아닌지 판단한다.
설정 가능한지 configurable
프로퍼티를 객체에서 삭제하거나 속성을 수정할 수 있는지 아닌지를 판단한다.
Object.defineProperty로는 프로퍼티 속성을 컨트롤하거나 (설정 가능한 경우) 새 프로퍼티를 만들 수 있다. 예를 들어 Object.defineProperty로 obj의 foo프로퍼티를 읽기 전용으로 만들 수 있다.

```javascript
Object.defineProperty(obj, "foo", { writable: false });
```

## 객체 보호: 동결, 봉인, 확장금지

자바스크립트의 유연성은 매우 강력하기도 하지만, 그만큼 문제가 생길 소지도 많다. 어떤 코드든, 그 위치가 어디이든, 다른 객체를 쉽게 바꿀 수 있으므로 의도와 달리 위험한 코드를 만들 가능성이 항상 존재한다.
js에서는 객체를 보호해서의도하지 않은 수정을 막고 의도적인 공격은 더어렵게 만드는 세가지 메커니즘이 있다. 동결, 봉인, 확장 금지이다.
동결된 객체는 수정할 방법이 없다. 일단 객체를 동결하면 아래와 같은 작업이 불가능하다.

- 프로퍼티 값 수정 또는 할당
- 프로퍼티 값을 수정하는 메서드 호출
- setter호출
- 새 프로퍼티 추가
- 새 메서드 추가
- 기존 프로퍼티나 메서드의 설정변경
  간단히 말해 객체를 동결하면 극 객체는 문자열이나 숫자처럼 불변이 된다.객체를 동결하면 상태를 바꾸는 메서드가 모두 쓸모없어지므로 데이터만 들어있는 객체에서 가장 유용하다. 객체를 동결할 때는 Object.freeze를 사용하고 객체가 동결됐는지 확인 할 때는 Object.isFrozen을 사용한다. 회사,버전,빌드ID,저작권 정보등 앞으로 바뀔일이 없는 프로그램에 대한 정보를 객체에 보관한다고 생각해보자

```javascript
const appInfo = {
  company: "hyunjin company",
  version: "1.3.4",
  buildId: "20312312k3kljlkjsld34",
  copyright() {
    return ` ${this.compayn}`;
  },
};
Object.freeze(appInfo);
```

객체를 봉인하면 새 프로퍼티를 추가하거나 기존 프로퍼티를 변경, 삭제 할 수없다. 클래스의 인스턴스를 사용하면서, 인스턴스의 프로퍼티를 수정하는 메서드는 동작하도록 할 때 봉인을 사용할 수 있다.객체를 봉인할때는 Object.seal객체가 봉인됐는지 확인할 때는 Object.isSealed 를 사용한다.

```javascript
class Logger {
  constructor(name) {
    this.name = name;
    this.log = [];
  }
  add(entry) {
    this.log.push({
      log: entry,
      timestamp: Date.now(),
    });
  }
}
const log = new Logger("Captain's Log");
Object.seal(log);
Object.isSealed(log);

log.add("Another boring day at sea...");
```

가장 약한제약은 확장금지이다.
확장금지를 사용하면 객체에 새 프로퍼티를 추가하는 것만 금지된다. 프로퍼티에 값을 할당하거나, 삭제하거나, 속성을 변경하는 작업은 모두 허용된다. 확장을 금지할때는 Object.preventExtensions, 확장이 금지됐는지 확인할 때는, Object.isExtensible 을 사용한다.

## 프락시 proxies

프락시는 ES6에서 새로 추가된 메타 프로그래밍 기능이다. 메타프로그래밍이란 프로그램이 자기 자신을 수정하는 것을 말한다.
객체 프락시는 간단히 말해 객체에 대한 작업을 가로채고, 필요하다면 작업 자체를 수정하는 기능이다. 프로퍼티 접근을 수정하는 예제를 만들어보자.

```javascript
const coefficients = {
  a: 1,
  b: 2,
  c: 5,
};
```

이 객체의 프로퍼티가 수학의 계수라고 생각하자 그렇다면 다음과 같이 사용할 수 있다.

```javascript
function evaluate(x, co) {
  return co.a + co.b * x + co.c * Math.pow(x, 2);
}
```

하지만 만약 계수 일부가 빠진 객체를 가지고 계산하려고 한다면??
coefficients.b 에 0을 할당하면 문제를 해결할 수 있으나, 프락시를 쓰는 방법이 더 낫다. 프락시는 객체를 대상으로 한 작업을 가로채므로, 정의되지 않은 프로퍼티는 항상 0을 반환하게 만들 수 있다.

```javascript
const betterCoefficcients = new Proxy(coefficients, {
  get(target, key) {
    return target[key] || 0;
  },
});
```

Proxy생성자에 넘기는 첫번째 매개변수는 타겟, 즉 프락시할 객체이다.
두번째 매개변수는 가로챌 동작을 가리키는 핸들러이다. 여기서는 프로퍼티에 접근하는 동작만 가로 챘으며, get함수가 핸들러이다. (프로퍼티 접근자인 get와는 다르다. 이 핸들러는 일반적인 프로퍼티나 접근자 프로퍼티 모두 동작한다.)get함수는 매개변수로 타겟, 프로퍼티 키(문자열 또는 심볼),수신자(프락시 자체 또는 프락시에서 파생되는 것)를 받는다.해당 키 타겟에 있는지 확인하고, 없으면 0을 반환한다.
coefficients 객체의 프락시에는 무한한 프로퍼티가 있고, 직접 정의한 프로퍼티를 제외하면 모두 값이 0인 것이나 마찬가지이다.
