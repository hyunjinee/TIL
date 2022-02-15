# 정규표현식

정규표현식은 정교한 문자열 매칭 기능을 제공한다. 이메일 주소나 URL, 전화번호처럼 보이는 문자열을 찾고 싶다면 정규표현식에 익숙해져야한다. 문자열 매칭을 하다보면 자연스레 문자열 교체도 자주하게 되는데, 정규표현식에서는 문자열 교체에 필요한 기능도 있다. 예를 들어 이메일 주소처럼 보이는 문자열을 찾아 그 주소를 가리키는 하이퍼링크로 바꿀 수 있다.

## 17.1 부분 문자열 검색과 대체

정규식으로 하는 일은 결국 문자열 속에서 부분 문자열을 찾는 일이며 찾은 부분을 교체할 때도 있다. 정규식이 제공하는 기능은 대단히 유연하고 강력하지만, 그 만큼 방대하다.
String.prototype 메서드의 검색과 교체 기능에는 한계가 있지만, 그 한계 안에서는 충분히 쓸만하다.
큰 문자열 안에 원하는 부분 문자열이 존재하는지 찾기만 할때는 String.prototype 메서드로 충분하다.

```javascript
const input = "As I was going to Saint Ives";
input.startsWith("As"); //true
input.endsWith("Ives"); //true
input.startsWith("going", 9); // true 인덱스 9 에서 시작한다.
input.endsWith("going", 14); // 인덱스 14를 문자열의 끝으로 간주한다.
input.includes("going", 10); // false 인덱스 10에서 시작하면 going 이 없다
input.includes("going"); // true
input.indexOf("going"); // 9
input.indexOf("going", -1); // -1
input.indexOf("nope"); // -1
```

이들 메서드는 모두 대소문자를 구분한다. 따라서 inputs.startsWith("as") 는 false 이다. 대소문자를 구분하지 않고 비교하려면, input.toLowerCase().startsWith("as")

String.prototype.toLowerCase는 원래 문자열은 그대로 두고 새 문자열을 반환한다. 자바스크립트의 문자열은 항상 불변이다.

부분 문자열을 찾아서 교체하려면 String.prototype.replace 를 사용한다.

```javascript
const input = "As I was going to Saint Ives";
const output = input.replace("going", "walking");
```

원래 문자열 input은 바뀌지 않는다. going 을 walking으로 교체한 새 문자열은 output에 할당된다.

## 17.2 정규식 만들기

자바스크립트의 정규식은 RegExp클래스이다. RegExp생성자로 정규식을 만들 수 있지만 간편한 리터럴 문법도 있다. 정규식 리터럴은 슬래시로 감싼 형태이다.

```javascript
const re1 = /going/; // 단어 "going" 을 찾을 수 있는 정규식
const re2 = new RegExp("going"); // 생성자를 사용했지만 결과는 같다.
```

## 정규식 검색

정규식이 만들어지면 다양한 옵션으로 문자열을 검색할 수 있다.
정규식의 문자열 교체옵션에 대해 이해하려면 정규식 메타 언어에 대해 좀 알아야한다.
/\w{3,}/ig 이 정규식은 세글자 이상인 단어에 모두 일치하고 대소문자는 가리지 않는다.

```javascript
const input = "As I was going to Saint Ives";
const re = /\w{3,}/i g;
//문자열의 메서드를 사용할때
input.match(re); //["was", "going", "Saint", "Ives"]
input.search(re); // 5 세글자 이상으로 이루어진 첫단어의 인덱스는 5이다.
// 정규식의 메서드를 사용할 때
re.exec(input); // ["was"] 처음 일치하는것
re.exec(input); // ["going"] exec는 마지막 위치를 기억한다.
re.exec(input); // ["Sain"]
re.exec(input); // ["Ives"]
re.exec(input); // null
re.test(input); // true input에는 세글자 이상으로 이루어진 단어가 한개 이상 있다.
//위 예제는 모두 정규식 리터럴을 그대로 써도 된다.
input.match(/\w{3,}/ig)
input.search(/\w{3,}/ig)
/\w{3,}/ig.test(input)
/\w{3,}/ig.exec(input)

```

이중 가장 많은 정보를 제공하는 것은 RegExp.prototype.exec 메서드이지만, 현실적으로는 가장 적게 쓰는 메서드이다.
정규식을 이용해서 4글자 이상인 것을 모두 교체

```javascript
const input = "As I was going to Saint Ives";
const output = input.replace(/\w{4,}/gi, "****");
// "As I was **** to **** ****"
```

## 17.5 입력소비

정규식을 큰 문자열에서 부분 문자열을 찾는 방법이라고만 생각해서는 안된다. 물론 원하는 것이 그것일 수도 있지만, 그런 사고방식이 굳어지면 정규식의 근본적인 성격을 이해하지 못하게 되고 할 수 있는 일도 제한된다.
좀더 나은 개념은 정규식이 입력 문자열을 소비하는 패턴이라고 생각하는 것이다. 찾아낸 부분 문자열은 그렇게 소비한 결과 만들어진 부산물이다.
정규식이 문자열을 소비할때 사용하는 알고리즘

- 문자열 왼쪽에서 오른쪽으로 진행한다.
- 일단 소비한 글자에 다시 돌아오는 일은 없다.
- 한번에 한 글자 씩 움직이며 일치하는 것을 확인
- 일치하는 것을 찾으면 해당 글자를 한꺼번에 소비한 후 다음 글자를 진행(정규식에 /g플래그를 써서 전역으로 검색할 때에 해당한다.)

왼쪽에서 오른쪽으로 진행하면서 한번에 한글자씩 소비하고 일치하는 것을 찾으면 그 전체를 즉시소비한다.

## 17.6 대체

| 파이프는 대체를 뜻하는 메타문자이다. ig는 대소문자를 가리지않고(i) 전체 (g)를 검색하라는 뜻이다.g플래그가 없으면 일치하는 것중 첫 번째만 반환한다. 겹치는게 있을 경우 큰 것을 먼저 써야한다. 작은것을 먼저 쓰면 큰것은 절대 찾을 수 없다.

## 17.8 문자 셋

문자셋은 글자 하나를 다른것으로 대체하는 방법을 간단하게 줄인것이다. 예를 들어서 문자열에 있는 숫자를 모두 찾고 싶다고하자. 대체를 사용하면 다음과 같이 할 수 있다.

```javascript
const beer99 =
  "99 bottles of beer on the wall " +
  "take 1down and pass it around -- " +
  "98 bottles of beer on the wall.";
const matches = beer99.match(/0|1|2|3|4|5|6|7|8|9/g);
```

문자셋은 이러이러한 문자들이 들어간다는 것을 간략하게 표기할 수 있다.
범위를 지원하므로 더 간략하게 표시하는것도 가능하다.

```javascript
const m1 = beer99.match(/[0123456789]/g);
const m2 = beer99.match(/[0-9]/g);
```

범위를 결합하는 것도 가능하다. 다음 정규식은 문자열에서 글자와 숫자, 기타 구두점을 찾는다. 사실 공백만 빼고 다 찾는다.

```javascript
const match = beer99.match(/[\-0-9a-z.]/gi);
```

하이픈은 이스케이프해야한다 이스케이프 하지 않으면 정규식은 하이픈을 범위를 표시하는 메타 문자라고 간주한다. 문자셋은 특정문자, 또는 범위를 제외하고 찾을 수도 있다. 문자셋을 제외할 때는 다음과 같이 캐럿(^)을 맨 앞에 쓰면 된다.

```javascript
const match = beer99.match(/[^\-0-9a-z.]/);
```

위 정규식은 문자열에서 공백만 찾는다.

## 17.9 자주 쓰는 문자셋

매우 자주쓰이는 문자셋은 단축 표기가 따로 있다. 이들을 클래스라고 부르기도한다.
\d = [0-9]
\D = [^0-9]
\s = [ \t\v\n\r] 탭 스페이스 세로탭 줄바꿈이 포함된다.
등등..
