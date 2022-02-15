process.on("exit", (code) => {
  console.log("잘가");
});

process.on("uncaughtException", (err) => {
  console.log("예외 발생");
});

var count = 0;
var test = function () {
  count++;
  if (count > 3) return;
  setTimeout(test, 2000);
  error();
};

setTimeout(test, 2000);
