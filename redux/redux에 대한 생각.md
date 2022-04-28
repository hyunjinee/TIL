## redux에 대한 생각

리덕스는 상태의 중앙 관리를 위한 상태관리 도구이다.

즉, 전역 상태 (Store)를 생성하고 상태 (State)를 관리하기 위한 패턴 및 라이브러리이다.

Store는 생성시에 reducer함수를 요구한다.

reducer는 data를 modify해주는 함수로 reducer가 return 하는 것은 application에 있는 데이터가 된다.

리듀서는 데이터를 바꾸는 함수이다. 리듀서가 리턴하는것은 스토어의 상태입니다.

State(Read-only)를 변경할 수 있는 수단은 Action Type에 따른 Reducer호출이다. 이는 새로운 State를 리턴한다. 여기서 액션이란 상태에 어떤 변화가 필요할 때 발생시키는 것이다. 이는 하나의 객체로 표현하며, 액션 객체는 type필드를 필수적으로 갖는다.

액션은 dispatch(action)와 같이 호출하여, 이를 스토어가 트리거하여 리듀서는 정의된 action.type에 따른 함수를 실행시켜서 액션을 처리한다.

액션 생성함수(action creator)는 액션을 만드는 함수로 파라미터를 받아 액션 객체 형태로 만들어준다.

```
export const ADD_POST = post => ({
  type: "ADD_POST",
  post
});
```

이러한 액션 생성 함수를 만들어서 사용하는 이유는 이후 컴포넌트에서 더욱 쉽게 액션을 발생시키기 위함이다. 그렇기 때문에 export 키워드를 붙여서 해당 컴포넌트에서 import하여 사용한다.

React에는 상태관리도구인 Context API또한 존재하는데, 전역적이지 않은 상태를 다루기에 용이하다. 대게 상태관리 라이브러리가 그렇듯 Redux 또한 전역 상태에 포커스가 되어있으며, 전역적이지 않는 상태를 다루는 것에는 취약하다.

![123](https://user-images.githubusercontent.com/63354527/165681330-31ea7457-5852-40ce-a470-880c0d6cda58.png)

위와 같이 컴포넌트 트리중에서 특정 subtree(파란 사각형)에서만 공유되는 데이터가 존재할 때, Redux는 global state에 저장하고 접근해야한다.반면에 Context는 오른쪽 그림과 같이 필요한 경우 Context를 만들어서 제공할 수 있다. Context API의 단점으로는 Context가 제공하는 Provider 와 Consumer가 리액트 컴포넌트 이기 때문에 wrapper hell 이 발생한다는 단점이 있다.

## 리덕스 미들웨어

리덕스에서 비동기 작업을 처리할 때 사용되는 미들웨어 redux-thunk, redux-promise, redux-pender

미들웨어는 액션이 디스패치 되어서 리듀서에서 이를 처리하기 전에 사전에 지정된 작업들을 설정합니다. 미들웨어를 액션과 리듀서 사이의 중간자라고 이해하면 됩니다.

![123](https://user-images.githubusercontent.com/63354527/165681330-31ea7457-5852-40ce-a470-880c0d6cda58.png)

리듀서가 액션을 처리하기 전에, 미들웨어가 할 수 있는 작업들은 여러가지가 있습니다. 전달받은 액션을 콘솔에 기록할 수 있고, 전달받은 액션에 기반하여 액션을 아예 취소시켜버리거나 다른 종류의 액션들을 추가적으로 디스패치 할 수도 있습니다.

리덕스 미들웨어의 목적은 액션이 리듀서에 도착하기전에 인터셉트하는 것입니다. 보통 유저가 버튼을 클릭할 때 액션을 리듀서에 전달합니다. 하지만 여기서 먼저 미들웨어에다가 전달할껍니다.

![1234](https://user-images.githubusercontent.com/63354527/165681308-52bd4966-d89d-409c-ad10-930c249129b9.png)

리듀서에 액션이 도달하지 못하게끔 미들웨어에서 컨트롤할 수 도있습니다. 미들웨어는 그냥 함수를 리턴하는 함수일 뿐입니다.

다음으로 제가 공부하면서 어려움을 겪었던 ‘**왜 비동기 요청은 리덕스 어플리케이션을 부시는가**’에 대해서 알아봅시다.

액션 생성자는 type속성을 갖는 plain한 자바스크립트 객체만을 리턴할 수 있습니다. 또한 데이터를 fetch해오기 전에 액션이 리듀서에게 보내지는 상황이 발생합니다. 아래 코드를 보겠습니다.

```
export const fetchPosts = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return {
    type: 'FETCH_POSTS',
    payload: response.data,
  };
};

// 여기서 무슨 문제가 있을까요?  우리는 여기서 하라는데로 플레인한 자바스크립트 객체를 리턴하고 있지 않은가요?

// 맞다. 하지만 위의 코드는 우리가 빌드해서 배포했을 때 브라우저에서 저렇게 실행되는 것이 아닙니다.
// 바벨을 통해 우리의 웹브라우저가 이해 가능한 코드로 바뀝니다.
// 바벨에 접속해서 이 코드를 붙여넣기하면 바뀌는 것을 볼 수 있습니다.
// 우리는 async await 을 사용하고 있기 때문에 코드가 아래와 같이 바뀝니다.

while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return axios.get("https://jsonplaceholder.typicode.com/posts");

            case 2:
              response = _context.sent;
              return _context.abrupt("return", {
                type: "FETCH_POSTS",
                payload: response.data
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
//여기서 case2는 리턴객체가 액션 객체인 것처럼 보이지만 다른 객체는 액션 객체를 리턴하는 것처럼 보이지않습니다.
// 이것이 리덕스에서 비동기 요청을 한 후 액션 객체를 리턴하는 것처럼 보이지만 실제로는 아닐 수도 있는 이유입니다.
// 만약 async await 키워드를 지우면 우리가 원하는 액션객체를 반환하는 것으로 컴파일 됩니다. (바벨)
// async await 키워드를 지웠을 때 아래와 같습니다.


export const fetchPosts = () => {
  const promise= axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return {
    type: 'FETCH_POSTS',
    payload: promise,
  };
};

// 위 코드에서의 문제는 데이터 fetching 이 끝나지 않은 상태에서 액션 객체를 리턴하고 있다는 점입니다.
```

이문제를 해결하기 위한 미들웨어가 리덕스 thunk 입니다.

리덕스 thuck는 액션 creator가 액션 객체를 리턴하는 것이 아닌, 함수를 리턴할 수 있게 해줍니다. 이게 어떻게 비동기 요청을 해결할까요. 우리는 단지 액션이 디스패치 되는 것을 멈출뿐입니다. 아래의 thunk에 대한 설명이 더 잘 이해 시켜줄 것입니다. 우리는 함수를 리턴하므로 앱을 잠깐 멈추는 것과 비슷합니다. 그래서 우리는 디스패치를 직접적으로 호출해주어야 합니다. 우리는 하나의 다른 함수를 리턴함으로써 async await 문법을 실행되지 않은 함수로써 쓸 수 있고 우리는 미들웨어 함수가 있으므로 액션객체를 리턴하는 대신 함수를 리턴하고 있습니다.

```
export const fetchPosts =  ( ) => {
    return async(dispatch, getState) {
        const response = await axios.get('어쩌구저쩌구')
        dispatch({type: "FETCH_POSTS" , payload: response.data})
    }
}

// 좀이쁘게 쓰면

export const fetchPosts =( ) => async (dispatch, getState) {
        const response = await axios.get('어쩌구저쩌구')
        dispatch({type: "FETCH_POSTS" , payload: response.data})
}
```

thunk란 특정 작업을 나중에 하도록 미루기 위해서 함수 형태로 감싼것을 지칭합니다. 예를 들어서 1+2를 지금 당장하고싶다면 아래와 같이합니다.

```
const x = 1 + 2;
```

하지만 다음과 같이 한다면?

```
const foo = () => 1 + 2;
```

1+2연산이 코드가 실행될 때 이루어지지않고 나중에 foo()가 호출되어야만 이뤄집니다.

thuck미들웨어는 객체대신 함수를 생성하는 액션 생성함수를 작성할 수 있게 해줍니다. 리덕스에서는 기본적으로는 액션 객체를 디스패치합니다. 일반 액션 생성자는 다음과 같이 파라미터를 가지고 액션 객체를 생성하는 작업만 합니다.

```
const actionCreator = (payload) =>  ({action:'ACTION', payload})
```

만약 특정 액션이 몇초뒤에 실행되게 하거나, 현재 상태에 따라 아예 액션이 무시되게 하려면 일반 액션 생성자로는 할 수 없습니다. 하지만 리덕스 thuck는 이를 가능하게 합니다.

```
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => { // dispatch 를 파라미터로 가지는 함수를 리턴합니다.
    setTimeout(() => {
      // 1 초뒤 dispatch 합니다
      dispatch(increment());
    }, 1000);
  };
}
```

이렇게 한다면 나중에 `store.dispatch(incrementAsync());` 를 하면 `INCREMENT_COUNTER` 액션이 1초뒤에 디스패치됩니다.

이번엔 조건에 따라 액션을 디스패치하거나 무시하는 코드를 살펴봅시다.

```
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```

리턴하는 함수에서 `dispatch, getState` 를 파라미터로 받게 한다면 스토어의 상태에도 접근 할 수있습니다. 따라서, 현재의 스토어 상태의 값에 따라 액션이 dispatch 될 지 무시될지 정해줄 수 있는것이죠.

간단하게 정리를 하자면 redux-thunk 는 일반 액션 생성자에 **날개**를 달아줍니다. 보통의 액션생성자는 그냥 하나의 액션객체를 생성 할 뿐이지만 `redux-thunk` 를 통해 만든 액션생성자는 그 내부에서 여러가지 작업을 할 수 있습니다. 이 곳에서 네트워크 요청을 해도 무방하죠. 또한, 이 안에서 액션을 여러번 디스패치 할 수도 있습니다.

Redux Thunk는 액션 생성자가 리턴하는 것을 객체가 아닌 함수를 사용할 수 있게 한다. 그리고 함수를 리턴하면 그 함수를 실행이 끝난 뒤에 값을 액션으로 넘겨준다.

정리하자면, 기존에 액션 생성자가 리턴하는 객체로는 처리하지 못했던 비동기 작업을 Redux Thunk를 사용하면서 일반 함수를 리턴할 수 있게 됨에 따라 일반 함수에서 가능한 모든 동작들이 가능해진다. 그중에 비동기 통신 작업을 할 수 있어 사용하는 것이다. Redux Thunk가 비동기 통신을 위해 만들어진 것이 아니라 액션 생성자가 함수를 리턴할 수 있다는 것에 좀 더 초점을 맞추어야 될 것 같다.

아래는 Redux-flow이다.

![1234423](https://user-images.githubusercontent.com/63354527/165681299-bfc3c1b8-f1f9-430f-a076-0ab51e046fea.png)
