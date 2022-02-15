const http = require("http");

const server = http.createServer();

server.on("request", function (code) {
  console.log("rrequest on");
});
server.on("connection", function (code) {
  console.log("connection on");
});

server.listen(52273);
