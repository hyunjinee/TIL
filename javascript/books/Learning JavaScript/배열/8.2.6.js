const arr = new Array(5).fill(1);
console.log(arr);
arr.fill("A");
console.log(arr);
arr.fill("b", 1);
console.log(arr);
arr.fill("c", 2, 4);
console.log(arr);
arr.fill(5.5, -4);

console.log(arr);
arr.fill(0, -3, -1);
console.log(arr);
