const onUncaughtException = function (error) {
  console.log("한번만 봐줌");
  process.removeListener("uncaughtException", onUncaughtException);
};

process.on("uncaughtException", onUncaughtException);

const test = function () {
  setTimeout(test, 2000);
  error.error.error();
};

setTimeout(test, 2000);
