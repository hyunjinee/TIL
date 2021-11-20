# moment
```ts
import moment from 'moment'
```

- moment 패키지를 사용하는 가장 큰 이유는 다음 코드처럼 과거와 현재의 시간 차이를 알기 쉬운 형태로 알려주기 때문이다.
```ts
console.log(person.createdDate).startOf('day').fromNow() // 20 hours ago
```

## moment-with-locales-es6 패키지 사용하기

moment 패키지는 기본적으로 문자열은 모두 영어로 출력합니다. 만일 앞 코드 부분을 20 hours ago 가 아닌 20시간 전 으로 표시하고 싶다면 일단 moment 객체를 moment 패키지가 아니라 다음처럼 moment-with-locales-es6 패키지에서 얻어야 합니다.

```ts
import moment from 'moment-with-locales-es6
```
그리고 다음처럼 moment.locale 메서드를 활용해서 언어를 'ko'로 설정해야합니다.

```ts
moment.locale('ko')
```