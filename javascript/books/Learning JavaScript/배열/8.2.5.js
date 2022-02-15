const arr = [1, 2, 3, 4];
arr.copyWithin(1, 2);
console.log(arr);
arr.copyWithin(2, 0, 2);
console.log(arr);
arr.copyWithin(0, -3, -1);
console.log(arr);
