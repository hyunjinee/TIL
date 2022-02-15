function makeMultiplier(x) {
  return function (y) {
    return x * y;
  };
}

let multi2 = makeMultiplier(2);
let multi10 = makeMultiplier(10);
console.log(multi2(3));
console.log(multi10(3));

//makeMultiplier 의 인수 x를 안쪽의 중첩함수에서 참조하고있다.
// 둘다 동일한 함수 몸통을 유지하나, 각자가 보유한 렉시컬 환경이 다르기 때문에, 다른결과가 나온다.
