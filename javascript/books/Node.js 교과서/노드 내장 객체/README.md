# 노드 내장 객체 알아보기

### global

브라우저의 window와 같은 전역 객체이다. 전역 객체이므로 모든 파일에서 접근할 수 있다. 또한 window.open메서드를 그냥 open으로 호출할 수 있는 것처럼 global도 생략할 수 있다. require함수도 global.require에서 global이 생략된 것이다.
노드에 DOM이나 BOM이 없으므로 window와 document 객체는 노드에서 사용할 수 없다. 노드에서window 또는 document를 사용하면 에러가 발생한다.
전역객체라는 점을 이용하여 파일간에 간단한 데이터를 공유할 때 사용하기도 한다. globalA.js 와 globalB.js를 같은 폴더에 생성해보자.

```javascript
//globalA.js
module.exports = () => global.message;
```

```javascript
//globalB.js
const A = require("./globalA");
global.message("안녕하세요");
console.log(A());
```

globlaA모듈의 함수는 global.message 값을 반환한다. globalB.js 에서는 global객체에 속성명이 message인 값을 대입하고 globalA모듈의 함수를 호출한다. 콘솔 결과는 globalB에서 넣은 값을 globalA에서도 접근 할수 잇음을 보여준다.

global객체의 속성에 값을 대입하여 파일간에 데이터를 공유할 수 있지만, 이를 남용하면 안된다. 프로그램의 규모가 커질수록 어떤 파일에서 global객체에 값을 대입했는지 찾기 힘들어져 유지 보수에 어려움을 겪게 된다. 다른 파일의 값을 사용하고 싶다면 모듈형식으로 만들어서 명시적으로 값을 불러와 사용하는 것이 좋다.

### console

브라우저의 console과 거의 비슷하다.

- console.time: console.timeEnd과 대응되어 같은 레이블을 가진 time과 timeEnd사이의 시간을 측정한다.
- console.log: 평범한 로그를 콘솔에 표시한다.
- console.error: 에러를 콘솔에 표시한다.
- console.table: 배열의 요소로 객체 리터럴을 넣으면 객체의 속성들이 테이블 형식으로 표시된다.
- console.dir: 객체를 콘솔에 표시할 때 사용한다. 첫번째 인수로 표시할 객체를 넣고, 두번째 인수로 옵션을 넣는다. colors를 true 로 하면 콘솔에 색이 추가되어 보기가 편해진다.depth는 객체 안의 객체를 몇 단계 까지 나타낼지 보여준다.
- console.trace: 에러가 어디서 발생했는지 추적한다. 일반적으로 에러 발생시 에러 위치를 알려주므로 자주 사용하지 않지만 위치가 나오지 않는다면 사용할 만하다.

### 타이머

타이머 함수들은 모두 아이디를 반환한다. 아이디를 사용하여 타이머를 취소할 수 있다.

### module, exports, require

module.exports와 exports는 같은 객체를 참조한다. 실제로 (module.exports===exports)를 하면 true 가 나온다.
exports객체를 사용할때는 module.exports와의 참조가 깨지지 않도록 주의해야한다. module.exports에는 어떤 값이든 대입해도 되지만 exports에는 반드시 객체처럼 속성명과 속성값을 대입해야한다. exports에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더이상 모듈로 기능하지 않는다. exports를 사용할 때는 객체만 사용할 수 있으므로 func.js와 같이 module.exports에 함수를 대입한 경우에는 exports로 바꿀수 없다.
exports와 module.exports에는 참조 관계가 있으므로 한 모듈에 exports객체와 module.exports를 동시에 사용하지 않는 것이 좋다.
다른 부분은 브라우저의 자바스크립트와 동일하지만 최상위 스코프에 존재하는 this는 module.exports를 가리킨다. 또한 함수 선언문 내부의 this는 global객체를 가리킨다.
순환참조가 있을 경우 순환 참조 대상을 빈 객체로 만든다. 이때 에러가 발생하지 않고 조용히 빈 객체로 변경하므로 예기치 못한 동작이 발생할 수 있다.

### process

process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다. process객체 안에는 다양한 속성이 있다.
process.version 설치된 노드의 버전
prcess.arch 프로세서 아키텍처 정보
process.platform 운영체제 플랫폼 정보
process.pid 프로세스의 아이디
process.uptime() 프로세스 시작후 흐른시간 단위는 초
process.execPath 노드의 경로이다.
process.ewd() 현재 프로세스가 실행되는 위치
process.cpuUsage() 현재 cpu 사용량

#### process.env

시스템 환경변수는 노드에 직접적 영향을 미친다. 대표적으로 UV_THREADPOOL_SIZE , NODE_OPTIONS
dotenv를 사용해서 process.env에 비밀 키들을 넣을 수 있다.

### process.nextTick(콜백)

이벤트 루프가 다른 콜백 함수들 보다 nextTick의 콜백 함수를 우선 처리하도록 만든다.
process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.
resolve된 Promise도 nextTick처럼 다른 콜백들보다 우선시된다. 그래서 process.nextTick과 Promise를 마이크로태스크라고 따로 구분지어서 부른다.
process.nextTick으로 받은 콜백함수나resolve된 Promise는 다른 이벤트 루프에서 대기하는 콜백함수보다도 먼저 실행된다. 그래서 비동기 처리를 할 때 setImmediate보다 process.nextTick을 더 선호하는 개발자도 있다. 하지만 이런 마이크로태스크를 재귀 호출하게 되면 이벤트 루프는 다른 콜백 함수보다 마이크로 태스크를 우선하여 처리하므로 콜백 함수들이 실행되지 않을 수 있다.
