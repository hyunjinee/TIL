//함수를 정의하는 방법에는 4가지가있다
// 함수 선언문으로 작성
function square(x) {
  return x * x;
}
// 함수 리터럴로 정의
let square = function (x) {
  return x * x;
};
// Function 생성자로 정의
//함수는 객체이다.
let square = new Function("x", "return x*x");
//화살표함수표현식으로 정의하는 방법
let square = (x) => x * x;
//한줄일경우 바로 리턴

//자바스크립트 엔진은 함수 선은문을 프로그램 첫머리 또는 함수의 첫머리로 끌어올린다.
//다음코드가 가능하다. 위 코드들 은 무시.
console.log(square(2));
function square(x) {
  return x * x;
}

//선언부만 호이스팅 되기 때문에 변수에 넣는 용법에서는 호출문을 아래에 작성해야한다.

// 특정 함수의 내부에 선언된 함수를 가르켜 그 함수의 중첩함수라고 한다.
// Nested function
