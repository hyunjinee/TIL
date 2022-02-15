# 네이티브

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()

네이티브는 내장함수이다. 


```js

var s = new String("heelo hyunjin")
```

네이티브는 생성자 처럼 사용할 수 있지만 실제로 생성되는 결과물은 예상과 다를 수 있다. 

```js
var a = new String("abc");
typeof a; "object"
a instanceof String; // true
Object.prototype.toString.call(a) "[object String]"
```

위에서 생성자의 결과는 원시값 "abc"를 감싼 객체 래퍼이다.

문자열 래퍼를 생성하고  원시값 abc는 아니다.

## 3.1 내부 [[Class]]

```js
Object.prototype.toString.call(null);
// "[object Null]"
Object.prototype.toString.call(undefined);
"[object Undefined]"

```

## 3.2 래퍼 박싱하기
객체 래퍼는 아주 중요한 용도로 쓰인다. 원시 값엔 프로퍼티나 메서드가 없으므로 .length, toString() 으로 접근하려면 원시 값으 ㄹ객체 래퍼로 감싸줘야한다. 고맙게도 자바스크립트는 원시값을 알아서 박싱하므로 다음과 같은 코드가 가능하다. 따라서 루프조건 i < a.length 처럼 빈번하게 문자열 값의 프로퍼티 메서드를 ㅏㅅ용해야한다면 자바스크립트 엔진이 암시적으로 객체를 생성할 필요가 없도록 처음부터 값을 객체로 갖고있는 것이 이치에 맞는 것처럼 보인다. 하지만 좋은 생각이 아니다. 오래전부터 브라우저는 이런 흔한 경우를 스스로 최적화하기 때문이다. 즉, 개발자가 직접 객체 형태로 선 최적화하면 프로그램이 더 느려질 수 있다. 직접 객체형태로 써야할 이유는 거의 없다.필요시 엔진이 알아서 암시적으로 박싱하게 하는 것이 낫다. 즉 new String("abc"), 처럼 코딩하지말고 그냥 알기 쉽게 원시값으로 사용하자.

### 3.2.1 객체 래퍼의 함정

```js

var a = new Boolean(false);

if (!a) {
    console.log('실해앙ㄴ됌')
}
```

false 를 객체 래퍼로 감쌌지만 문제는 객체가 truthy 한 값이라는 점이다.그래서 예상과는 달리 안에 들어있는 false 값과 반대의 결과다. 수동으로 원시 값을 박싱하려면 Object()함수를 이용한다. 


## 3.3 언박싱
객체 래퍼의 원시값은 valueOf() 메서드로 추출한다. 

```js

var a = new String("abc")
var b=  new Number(42)
var c = new Boolean(true)

a.valueOf()
b.valueOf()
c.valueOf() // true
```

## 3.4 네이티브, 나는 생성자다ㅏ.

배열, 객체 , 함수 ,정규식 같은 리터럴 형태로 생성하는 것이 일반적이지만, 리터럴은 생성자 형식으로 만든 것과 동일한 종류의 객체를 생성한다. 즉 래핑되지 않은 값은 없다. 

Array(1,2,3) 와 new Array(1,2 ,3)은 같다.

Array 생성자에는 특별한 형식이 하나 있는데 인자로 숫자하나만 받으면 그 숫자를 원소로하는 배열을 생성하는게 아니라 배열의 크기를 미리 정하는 기능이다. presize



```js
var a = new Array(3)
var  b= [undefined, undefined , undefined]

a.join("-")
b.join("-") 
a.map(function(v,i){ return i })
b.map(function(v,i) {
    return i
})
```

a.map()은 a에 슬록이 없기 때문에 map()함수가 순회할 원소가 없다. join은 다르다. join의 구현 로직을 살펴보자


```js

funciton fakeJoin(arr,connector) {
    var str = ""
    for (var i = 0; i < arr.length; i++) {
        if (i> 0) {
            str += connector;
        
        }
        if (arr[i] !== undefined) {
            str += arr[i]
        }
    }

    return str;
}

join은 슬롯이 있다는 가저앟에 length 만큼 루프를 반복한다. map()함수는 내부 로직이야 어떻든 이런 가정을 하지 않는 까닭에 이상한 빈 슬롯 배열이 입력되면 예기치 않은 결과가 빚어지거나 실패의 원인이 된다. 

Array.apply()

Array를 호출하는 동시에 {length: 3} 객체 값을 펼쳐서 인자로 넣는다.

apply내부에서는 아마 0에서 length 직전까지 루프를 순회할 것이다. 


### 3.4.2 Object(), Function(), and RegExp()

new Object() 같은 생성자 폼은 사실상 사용할 일이 없다. 리터럴 형태로 한번에 여러 프로퍼티를 지정할 수도 있는데 굳이 한번에 하나씩 일일이 프로퍼티르 ㄹ지정하는 방법으로 돌아갈 필요가 있을까?

Function 생성자는 함수의 인자나 내용을 동적으로 정의해야하는 매우 드문 경우에 한해 유용하다. Function()을 eval()의 대용품이라고 착각하지 말자. 이렇게 함수를 동적으로 정의하는 경우는 거의없을 것이다. 정규표현식은 리터럴 형식(/^a*b+/g)으로 정의할 것을 적극 권장한다. 구문이 쉽고 무엇보다 성능상 이점이있다.  자바스크립트 엔진이 정규 표현식을 미리 컴파일한 후 캐시한다. 

### 3.4.3 Date() 와 Error()

네이티브 생성자 Date()와 Error()는 리터럴형식이 없으므로 다른 네이티브에 비해 유용하다. date객체 값은 new Date()로 생성한다. 이 생성자는 날짜/시각을 인자로 받는다.
date는 유닉스 타임스탬프 값을 얻는 용도로 가장 많이 쓰일 것이다. date객체의 인스턴스로부터getTime()을 호출한다. 하지만 es5에 정의된 정적 도우미 함수 Date.now()를 사용하는게 더 쉽다. ES5 이전 브라우저에선 다음 폴리필을 쓰자.

```js
if (!Date.now) {
    Date.now = function () {
        return (new Date()).getTime();
    }
}
```

Error 생성자는 new 가 있든 없든 결과는 같다.

error 객체의 주 용도는 현재의 실행 컨텍스트를 포착하여 객체에 담는 것이다. 실행 스택 콘텍스트는 함수 호출 스택 error객체가 만들어지 ㄴ줄 번호등 디버깅에 도움이 될만한 정보들을 담고 있다. error 객체는 보통 throw 연산자와 함께 사용된다. Error객체의 인스턴스에는 적어도 message 프로퍼티는 들어있고,type등 다른 프로퍼티가 포함되어있을 때도 있다. 그러나 사람이 읽기 편한 포맷으로 에러메시지를 보려면 stack프로퍼티 대신 그냥 error객체의 toString()을 출력하는 것이 가장 좋다. 

### 3.4.4 Symbol()

심벌은 es6에서 처음 선보인 새로운 원시 타입이다. 심벌은 충돌 염려 없이 객체 프로퍼티로 사용가능한 특별한 유일 값이다. 주로 ES6 의 특수한 내장 로직에 쓰기 위해 고안되었지만 심벌을 언제든 정의할 수 있다. 심벌은 프로퍼티명으로 사용할 수 있으나 프로그램 코드나 개발자 콘솔 창에서 심벌의 실제 값을 보거나 접근하는 건 불가능하다. 심벌을 정의하려면 Symbol() 네이티브를 사용한다.

Symbol 은 앞에 new 를 붙이면 에러가 나는 유일한 네이티브 생성자이다.

심벌은 전용프로퍼티는 아니지만 본래의 사용 목적에 맞게 대부분 전용 혹은 특별한 프로퍼티로 사용한다. 심벌은 객체가 아니라 단순히 스칼라 원시 값이다. 

### 3.4.5 네이티브 프로토 타입

내장 네이티브 생성자는 각자의 .prototype객체를 가진다. 
-prototype 객체에는 해다 ㅇ객체의 하위 타입별로 고유한 로직이 담겨있다.
이를테면 문자열 원시값을 확장한 것까지 포함하여 모든 String 객체는 기본적으로 String.prototype객체에 정의된 메서드에 접근할 수 있다.

문자열 값을 변경하는 메서드는 없다. 수정이 일어나면 늘 기존값으로부터 새로운 값을 생성한다. 

프로토타입 위임 덕분에 모든 문자열이 이 메서드들을 같이 쓸 수 있다.

### 3.5 정리

자바스크립트는 원시 값을 감싸는 객체 래퍼 즉 네이티브를 제공한다. 객체 래퍼에는 타입별로 쓸 만한 기능이 구현되어 있어 편리하게 사용할 수 있다. "abc"같은 단순 스칼라 원시 값이 있을 때 이 값의 length 프로퍼티나 String.prototype 에 정의된 메서드를 호출하면 자바스크립트는 자동으로 원시값을 박싱하여 필요한 프로퍼티와 메서드를 쓸 수 있게 도와준다.

