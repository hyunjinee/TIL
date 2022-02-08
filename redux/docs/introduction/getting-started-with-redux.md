# Redux 시작하기

Redux는 자바스크립트 앱을 위한 예측 가능한 상태 컨테이너입니다.

Redux는 여러분이 일관적으로 동작하고, 서로 다른 환경(서버, 클라이언트, 네이티브)에서 작동하고, 테스트하기 쉬운 앱을 작성하도록 도와줍니다. 여기에 더해서 시간여행형 디버거와 결합된 실시간 코드 수정과 같은 훌륭한 개발자 경험을 제공합니다.

여러분은 Redux를 React나 다른 뷰 라이브러리와 함께 사용할 수 있습니다. Redux는 매우 작지만(의존 라이브러리 포함 2kB), 사용 가능한 애드온은 매우 많습니다.

## Redux Toolkit

툴킷은 리덕스 로직을 작성하기 위해 공식문서에서 추천하는 방법입니다. RTK는 리덕스 앱을 만들기에 필수적으로 여기는 패키지와 함수들을 포함합니다. 대부분의 Redux 작업을 단순화하고 흔한 실수를 방지하며 리덕스 앱을 만들기 쉽게 해주는 모범 사례를 통해 만들어 졌습니다.

RTK는 저장소 준비, 리듀서 생산과 불변 수정 로직 작성, 상태 조각 전부를 한번에 작성하는등 일반적인 작업을 단순화해주는 유틸리티를 포함하고 있습니다.

```bash
# NPM
npm install @reduxjs/toolkit
# YARN
yarn add @reduxjs/toolkit
```

### React Redux App

React와 Redux로 새 앱을 만들기 위해 추천하는 방법은 Create React App를 위한 공식 Redux+JS 템플릿을 사용하는 것입니다. 이를 통해 Redux Toolkit와 React Redux가 React 컴포넌트와 통합되는 이점을 누릴 수 있습니다.

```bash
npx create-react-app 여러분의앱이름 --template redux
```

### Redux core

Redux 코어 라이브러리는 NPM패키지로 받아 모듈 번들러나 Node앱에서 사용 가능합니다.

```bash
npm install redux

yarn add redux
```

`window.Redux` 전역 변수를 선언해준느 UMD 패키지도 사용가능합니다. UMD패키지는 스크립트 태그로 바로 사용가능합니다.

## 기본 예제

여러분의 앱의 상태 전부는 하나의 저장소(store) 안에 있는 객체 트리에 저장됩니다. 상태 트리를 변경하는 유일한 방법은 무엇이 일어날지 서술하는 객체인 액션을 보내는 것입니다. 액션이 상태트리를 어떻게 변경할지 명시하기 위해 여러분은 리듀서를 작성해야합니다.

```javascript
import { createStore } from "redux";
/**
 * 이것이 (state, action) => state 형태의 순수 함수인 리듀서입니다.
 * 리듀서는 액션이 어떻게 상태를 다음 상태로 변경하는지 서술합니다.
 *
 * 상태의 모양은 당신 마음대로입니다: 기본형(primitive)일수도, 배열일수도, 객체일수도,
 * 심지어 Immutable.js 자료구조일수도 있습니다.  오직 중요한 점은 상태 객체를 변경해서는 안되며,
 * 상태가 바뀐다면 새로운 객체를 반환해야 한다는 것입니다.
 *
 * 이 예제에서 우리는 `switch` 구문과 문자열을 썼지만,
 * 여러분의 프로젝트에 맞게
 * (함수 맵 같은) 다른 컨벤션을 따르셔도 좋습니다.
 */
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
// 앱의 상태를 보관하는 Redux 저장소를 만듭니다.
// API로는 { subscribe, dispatch, getState }가 있습니다.
let store = createStore(counter)

// subscribe()를 이용해 상태 변화에 따라 UI가 변경되게 할 수 있습니다.
// 보통은 subscribe()를 직접 사용하기보다는 뷰 바인딩 라이브러리(예를 들어 React Redux)를 사용합니다.
// 하지만 현재 상태를 localStorage에 영속적으로 저장할 때도 편리합니다.

store.subscribe(() => console.log(store.getState())))

// 내부 상태를 변경하는 유일한 방법은 액션을 보내는 것뿐입니다.
// 액션은 직렬화할수도, 로깅할수도, 저장할수도 있으며 나중에 재실행할수도 있습니다.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

상태를 바로 변경하는 대신, 액션이라 불리는 평범한 객체를 통해 일어날 변경을 명시합니다. 그리고 각각의 액션이 전체 어플리케이션의 상태를 어떻게 변경할지 결정하는 특별한 함수인 리듀서를 작성합니다.

보통의 Redux 앱에는 하나의 루트 리듀서 함수를 가진 단 하나의 저장소가 있습니다. 앱이 커짐에 따라 루트 리듀서를 상태 트리의 서로 다른 부분에서 개별적으로 동작하는 작은 리듀서들로 나눌 수 있습니다. React 앱을 하나의 루트 컴포넌트에서 시작해서 여러 작은 컴포넌트의 조합으로 바꾸는 것과 동일합니다.

이런 아키텍처가 카운터 앱에서는 너무 과한 것처럼 보이지만, 크고 복잡한 앱에서는 이 패턴의 확장성이 잘 드러납니다. 액션에 따른 모든 변경을 추적할 수 있기 때문에, 매우 강력한 개발자 도구를 가능하게 해주기도 합니다. 여러분은 사용자 세션을 기록한 다음 액션 하나하나를 다시 실행해 볼 수 있습니다.
