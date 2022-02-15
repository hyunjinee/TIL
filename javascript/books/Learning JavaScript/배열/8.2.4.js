const arr = [1, 5, 7];
arr.splice(1, 0, 2, 3, 4);
console.log(arr);
arr.splice(5, 0, 6);
console.log(arr);
arr.splice(1, 2);
console.log(arr);
arr.splice(2, 1, "a", "b");
console.log(arr);
