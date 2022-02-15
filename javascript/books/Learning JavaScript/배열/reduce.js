const words = [
  "Beachball",
  "Rodeo",
  "Angel",
  "Aardvark",
  "Xylophone",
  "November",
  "Chocolate",
  "Papaya",
  "Unifrom",
  "Joker",
  "Clover",
  "Bali",
];
const alpahbetical = words.reduce((a, x) => {
  if (!a[x[0]]) a[x[0]] = [];
  a[x[0]].push(x);
  console.log(a);
  return a;
}, {});
console.log(alpahbetical);
