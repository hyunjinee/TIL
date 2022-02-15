const SYM = Symbol();
const o = { a: 1, b: 2, c: 3, [SYM]: 4 };
for (let prop in o) {
  //console.log(prop);
  console.log(`${prop}:${o[prop]}`);
}
