// nested function 은 외부함수의 최상위 레벨에만 중첩함수를 작성할 수 있다.
// 함수안의 if문과while 문 등의 문장 블록안에서는 중첩함수를 작성할 수 없다.

function norm(x) {
  var sum2 = sumSquare();
  return Math.sqrt(sum2);
  function sumSquare() {
    sum = 0;
    for (var i = 0; i < x.length; i++) sum += x[i] * x[i];
    return sum;
  }
}
let a = [2, 1, 3, 5, 6];
let n = norm(a);
console.log(n);

//외부함수의 바깥에서는 읽거나 쓸 수없고, 자신을 둘러싼 외부함수의 인수와 지역변수에 접근가능
