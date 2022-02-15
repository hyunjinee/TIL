const arr = [
  { name: "Suzanne" },
  { name: "Jim" },
  { name: "Trevor" },
  { name: "Amanda" },
];
arr.sort();
console.log(arr); // 바뀌지 않는다.
console.log(arr.sort((a, b) => a.name > b.name));

console.log(arr);
arr.sort((a, b) => a.name[1] < b.name[1]);
console.log(arr);
