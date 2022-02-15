const o = { name: "Jerry" };
const arr = [1, 5, "a", o, true, 5, [1, 2], "9"];
console.log(arr.indexOf(5));
console.log(arr.lastIndexOf(5));
console.log(arr.indexOf("a"));
console.log(arr.lastIndexOf("a"));
console.log(arr.indexOf({ name: "Jerry" }));
console.log(arr.indexOf(o));
console.log(arr.lastIndexOf(3, true));
