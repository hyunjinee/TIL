const http = require("http");
const fs = require("fs");
const socketio = require("socket.io");

const server = http
  .createServer(function (req, res) {
    fs.readFile("io.html", function (req, res) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(52274, function () {
    console.log("server is running");
  });

var io = socketio.listen(server);
io.sockets.on("connection", function (socket) {});
