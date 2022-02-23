# iterator and genrator

대부분의 프로그래밍 언어에서 iterator는 다음과 같은 특징을 갖습니다.

1. next라는 이름의 메서드를 제공한다.
2. next메서드는 value와 done이라는 두개의 속성을 가진 객체를 반환한다.

**iterator를 제공하는 역할을 하는 함수를 iterable** (반복기 제공자)라고 합니다.

```typescript
export const createRangeIterable = (from: number, to: number) => {
  let currentValue = from;
  return {
    next() {
      const value = currentValue < to ? currentValue++ : undefined;
      const done = value == undefined;
      return { value, done };
    },
  };
};
```

다음은 iterator를 사용하는 예입니다.

```typescript
import { createRangeIterable } from "./createRangeIterable";
const iterator = createRangeIterable(1, 3 + 1);

while (true) {
  const { value, done } = iterator.next();
  if (done) break;
  console.log(value); // 1 2 3
}
```

이터레이터는 값이 필요한에 생성하기 때문에 시스템 메모리의 효율성이라는 관점에서 보면 한번에 만드는 함수보다 메모리를 훨씬 적게 소모합니다.

Iterable<T>와 Iterator<T> 제네릭 인터페이스를 사용해 봅시다.

Iterable<T> 는 다음처럼 자신을 구현하는 클래스가 [Symbol.iterator] 메서드를 제공한다는 것을 명확하게 알려주는 역할을 합니다.

```typeScript
class 구현클래스 implements Iterable<생성할 값의 타입> {}
```

또한 Iterator<T>는 이터레이터가 생성할 값의 타입을 명확하게 해줍니다.

```typescript
[Symbol.iterator]() : Iterator<생성할 값의 타입> {}
```

아래는 예제입니다.

```typescript
export class StringIterable implements Iterable<string> {
  constructor(private strings: string[] = [], private currentIndex: number = 0) {}
  [Symbol.iterator]() {
    const that = this;
    let currentIndex = that.currentIndex,
      length = that.strings.length;
    const iterator: Iterator<string> = {
      next(): { value: string; done: boolean } {
        const value = currentIndex < length ? that.strings[currentIndex++] : undefined;
        const done = value == undefined;
        return { value, done };
      },
    };
    return iterator;
  }
}
```

다음으로 generator에 대해서 알아봅시다.

ESNext JavaScript는 yield라는 키워드를 제공합니다. yield는 마치 return 키워드 처럼 값을 반환합니다. yield는 반드시 function* 키워드를 사용한 함수에서만 호출할 수 있습니다. 이렇게 function* 키워드로 만든 함수를 generator라고 합니다.

generator가 동작하는 방식을 '세미 코루틴(semi-coroutine)'이라고 합니다. 세미코루틴은 타입스크립트처럼 단일 스레드(single-thread)로 동작하는 프로그래밍 언어가 마치 다중 스레드로 동작하는 것처럼 보이게 하는 기능을 합니다.

> 세미코루틴과 코루틴의 차이
>
> 학문적으로 generator를 세미 코루틴이라고 합니다. 즉 생성기는 절반만 코루틴 입니다. 코루틴은 1958년부터 많은 학자가 꾸준히 연구해온 학문 주제입니다. 클로저는 코루틴을 최초로 프로그래밍 문법으로 탑재한 언어입니다. 구글에서 만든 go는 고루틴이라는 용어를 사용하지만 고루틴 또한 코루틴입니다. **코루틴은 어플리케이션 레벨의 스레드입니다.** 스레드는 원래 운영체제가 제공하는 개수가 제한된 서비스입니다. 스레드는 개수가 2000개 정도로 제한되었으므로, 특정 어플리케이션에서 운영체제의 스레드를 과다하게 소비하면 운영체제에 무리를 주게 됩니다. 운영체제에 부담을 주지 않으면서 어플리케이션에서 스레드를 마음껏 쓸 수 있게 하는 것이 코루틴의 목적입니다.
> 그런데 코루틴은 스레드이므로 일정 주기에 따라 자동으로 반복해서 실행됩니다. 반면에 생성기는 절반만 코루틴입니다. 즉 반복해서 실행할 수 있지만 자동으로 실행되지 못하는 코루틴입니다. 생성기는 사용하는 코드에서 생성기가 만들어준 iterator의 next 메서드가 호출될 때만 한번 실행됩니다. 만약 next메서드가 while문에서 반복해서 호출된다면, 생성기는 next 호출 때 한번 실행되고 멈춥니다. 이처럼 생성기는 자동으로 반복실행되지 않으므로 세미 코루틴이라고 합니다.

generator는 function* 키워드로 선언하고 함수 몸통 안에 yield문이 있습니다. 즉 function*키워드로 생성한 함수가 generator인데, 생성기는 화살표 함수로 만들수 없습니다. generator는 iterator를 제공하는 iterator제공자로서 동작합니다.

`function*`은 키워드입니다. 또한 \* 사이에 공백은 없어도 되고 여러개 있어도 상관 없습니다.

yield는 연산자 형태로 동작하며 다음처럼 두가지 기능을 합니다. iterator를 자동으로 만들어주고, iterator제공자 역할도 수행합니다.

다음은 StringIterable 클래스를 구현한 예제입니다.

```typescript
export class IterableUsingGenerator<T> implements Iterable<T> {
  constructor(private values: T[] = [], private currentIndex: number = 0) {}
  [Symbol.iterator] = function* () {
    while (this.currentIndex < this.values.length) {
      yield this.values[this.currentIndex++];
    }
  };
}
```

yield는 단순히 값을 대상으로 동작하지만 yield\* 키워드는 다른 생성기나 배열을 대상으로 동작합니다.

```typescript
function* gen12() {
  yield 1;
  yield 2;
}

export function* gen12345() {
  yield* gen12();
  yield* [3, 4];
  yield 5;
}

for (let value of gen12345()) console.log(value);
```
