리액트 컴포넌트는 설계도와 같은 것이다. 그리고 이러한 설계도를 기반으로 만들어진 대상을 리액트 요소라고 부른다. 리액트 컴포넌트를 클래스라고 한다면 리액트 요소는 인스턴스에 해당하는 개념이다.

props 는 함수의 매개변수로 준다. 어떤이름을 사용해도 상관없긴하다.

## propTypes

리액트는 props의 자료형을 확인하는 기능을 제공한다. 

> npm i --save prop-types

디폴트 프롭스 부모로부터 아무것도 전달 안받으면 undefined, 따라서 null을 전달하는 경우 defaultProps가 아니라 null이 props에 들어가게 된다.

componentWillMount 컴포넌트가 마운트 되기 직전에 호출. 컴포넌트를 렌더링하는 render메서드가 호출되기 전에 호출된다. render메서드보다 먼저 실행하는 함수로는 사실 생성자도 있다.
 
componentDidMount 에서 state를 바꾸면 render되고나서 render메서도 또실행

setState호출하지말자 여기선


componentwillreceiveProps
이 라이프 사이클 메서드는 이름 그대로 속성을 전달받기 직전에 호출된다.
속성이 업데이트 될 때만 실행된다. 속성을 받기만 하면 무조건 실행되므로 this.props와 nextProps가 완전히 같더라도 호출된다.

