# 콜백

자바스크립트 호스트 환경이 제공하는 여러 함수를 사용하면 비동기동작을 스케줄링 할 수 있다. 원하는 때에 동작이 시작하도록 할 수 있다.

setTimeout은 스케줄링에 사용되는 가장 대표적인 함수이다.

스크립트를 추가할 때 스크립트 아래의 코드들은 스크립트가 로딩이 종료되는 것을 기다리지 않는다.
원하는 대로 스크립트 안의 함수나 변수를 사용하려면 스크립트 로딩이 끝났는지 여부를 알 수 있어야 한다.

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```

새롭게 불러온 스크립트에 있는 함수를 콜백 함수 안에서 호출하면 원하는 대로 외부 스크립트 안의 함수를 사용할 수있다.

```js
loadScript('/my/script.js', function() {
  // 콜백 함수는 스크립트 로드가 끝나면 실행됩니다.
  newFunction(); // 이제 함수 호출이 제대로 동작합니다.
  ...
});
```

이렇게 두 번째 인수로 전달된 함수(대개 익명함수)는 원하는 동작(위 예제에선 외부 스크립트를 불러오는 것)이 완료되었을 때 실행된다.

이런 방식을 콜백기반 비동기 프로그래밍이라고 한다. 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야한다.

## 콜백 속 콜백

스크립트가 두개 있을 경우 스크립트를 순차적으로 불러올 방법은 콜백 속에 콜백을 넣는 것이다. 첫 번째 스크립트의 로딩이 끝난 이후가 되길 원한다면 그렇게 해야한다.

```javascript
loadScript("/my/script.js", function (script) {
  alert(`${script.src}을 로딩했습니다. 이젠, 다음 스크립트를 로딩합시다.`);

  loadScript("/my/script2.js", function (script) {
    alert(`두 번째 스크립트를 성공적으로 로딩했습니다.`);
  });
});
```

여기에 스크립트 하나를 더 불러오고 싶다면? 계속 콜백을 중첩시키게 된다. 동작이 많으면 매우 이해하기 어려운 코드가 된다. 따라서 다른 방식으로 코드를 작성해야한다.

## 에러 핸들링

스크립트의 로딩이 실패한다면 어떻게 할까? 물론 콜백함수는 에러를 핸들링 할수 있어야한다.

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () =>
    callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}
```

```js
loadScript("/my/script.js", function (error, script) {
  if (error) {
    // 에러 처리
  } else {
    // 스크립트 로딩이 성공적으로 끝남
  }
});
```

이렇게 에러를 처리하는 방식은 흔히 사용되는 패턴이다. 이 패턴은 오류우선 콜백이라고 불린다. (error-first callback)

1. callback 의 첫번째 인수는 에러를 위해 남겨둔다. 에러가 발생하면 이 인수를 이용해서 callback(err)이 호출된다.
2. 두번째 인수는 에러를 발생하지 않았을 때를 위해 남겨둔다. 원하는 동작이 성공한 경우엔 callback(null, result1, result2...)이 호출된다.
   오류 우선 콜백 스타일을 사용하면 단일 콜백 함수에서 에러케이스와 성공 케이스를 모두 처리할 수 있다.

## 멸망의 피라미드

콜백 기반 비동기 처리는 언뜻 봤을 때 꽤 쓸만해 보이고, 실제로도 그렇다. 한개 혹은 두개의 중첩 호출이 있는 경우는 보기에도 나쁘지 않다.
하지만 꼬리에 꼬리를 무는 비동기 동작이 많아지면 아래와같은 코드 작성이 불가피해진다.

```js
loadScript("1.js", function (error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", function (error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript("3.js", function (error, script) {
          if (error) {
            handleError(error);
          } else {
            // 모든 스크립트가 로딩된 후, 실행 흐름이 이어집니다. (*)
          }
        });
      }
    });
  }
});
```

호출이 계속 중첩되면서 코드가 깊어지고 있네요. 본문 중간중간 ...로 표시한 곳에 반복문과 조건문이 있는 코드가 들어가면 관리는 특히나 더 힘들어질 겁니다.

이렇게 깊은 중첩 코드가 만들어내는 패턴은 소위 ‘콜백 지옥(callback hell)’ 혹은 '멸망의 피라미드(pyramid of doom)'라고 불립니다.

비동기 동작이 하나씩 추가될 때마다 중첩 호출이 만들어내는 '피라미드’는 오른쪽으로 점점 커집니다. 곧 손쓸 수 없는 지경이 되어버리죠.

따라서 이런 코딩 방식은 좋지 않습니다.

각 동작을 독립적인 함수로 만들어 위와 같은 문제를 완화해 보도록 합시다. 아래와 같이 말이죠.

```js
loadScript("1.js", step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("3.js", step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // 모든 스크립트가 로딩되면 다른 동작을 수행합니다. (*)
  }
}
```

어떤가요? 새롭게 작성한 코드는 각 동작을 분리해 최상위 레벨의 함수로 만들었기 때문에 깊은 중첩이 없습니다. 그리고 콜백 기반 스타일 코드와 동일하게 동작하죠.

그런데 이렇게 작성하면 동작상의 문제는 없지만, 코드가 찢어진 종잇조각 같아 보인다는 문제가 생깁니다. 읽는 것도 어려워지죠. 눈을 이리저리 움직이며 코드를 읽어야 합니다. 코드에 익숙지 않아 눈을 어디로 옮겨야 할지 모르면 더욱더 불편할 것입니다.

게다가 step\*이라고 명명한 함수들은 '멸망의 피라미드’를 피하려는 용도만으로 만들었기 때문에 재사용이 불가능합니다. 그 누구도 연쇄 동작이 이뤄지는 코드 밖에선 함수들을 재활용하지 않을 겁니다. 네임스페이스가 약간 복잡해졌네요(namespace cluttering).

지금쯤이면 더 나은 무언가가 필요하다는 생각이 강하게 들 겁니다.

운 좋게도, 멸망의 피라미드를 피할 방법이 몇 가지 있습니다. 가장 좋은 방법은 프라미스를 사용하는 것이다.
