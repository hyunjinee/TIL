function* gen12() {
  yield 1;
  yield 2;
}

export function* gen12345() {
  yield* gen12();
  yield* [3, 4];
  yield 5;
}

for (let value of gen12345()) console.log(value);
