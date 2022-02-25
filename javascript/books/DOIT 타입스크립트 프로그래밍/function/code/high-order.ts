const add =
  (a: number) =>
  (number) =>
  (b: number): number =>
    a + b;
const result = add(1)(2);
console.log(result);
