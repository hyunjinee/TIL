function myConcat(separator) {
  let s = "";
  for (let i = 1; i < arguments.length; i++) {
    s += arguments[i];
    if (i < arguments.length - 1) s += separator;
  }
  return s;
}
console.log(myConcat("/", "apple", "orange", "peach"));

// arguments.callee => 현재 실행되고 있는 함수의 참조
