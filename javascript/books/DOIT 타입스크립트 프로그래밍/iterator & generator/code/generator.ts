import { rangeGenerator } from "./rangeGenerator";

export function* generator() {
  console.log("generator started");
  let value = 1;
  while (value < 4) yield value++;
  console.log("generator ended");
}

let iterator = rangeGenerator(1, 3 + 1);

while (1) {
  const { value, done } = iterator.next();
  if (done) break;
  console.log(value);
}

for (let value of rangeGenerator(4, 6 + 1)) console.log(value);
