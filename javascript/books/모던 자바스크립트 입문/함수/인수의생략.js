//자바스크립트에서는 함수를 호출할 때 인수를 생략할 수 있다. 반대로 함수 정의식에 작성된 인자개수보다 더많은 개수의
//인자를 넘겨서 함수를 실행할 수도 있다.

function f(x, y) {
  console.log("x= " + x + ", " + "y = " + y);
}
f(2);

function multiply(a, b) {
  b = b || 1;
  console.log(a * b);
}

multiply(2, 3);
multiply(2);

//모든 함수에서 사용할 수 있는 지역변수로는 arguments 변수가있다.
// arguments 변수의 값은 Argument 객체이다.

// Argument 객체는 유사배열객체이다.

function f(x, y) {
  arguments[1] = 3;
  console.log(x, y);
}
f(1, 2);
