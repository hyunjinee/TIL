process.on("exit", function (code) {
  console.log("끔");
});
// process.exit();
process.emit("exit");

process.emit("exit");

process.emit("exit");

process.emit("exit");

process.emit("exit");

console.log("프로그램 실행중");

//exit 이벤트를 호출해도 프로그램이 종료되지 않는다. emit() 메서드를 호출하면 이벤트 리스너만 실행되기 때문이다.
