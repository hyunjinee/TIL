const fs = require("fs");
const server = require("http").createServer();
const io = require("socket.io").listen(server);

server.listen(52274, function () {
  console.log("server is running");
});

server.on("request", function (req, res) {
  fs.readFile("room.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

io.sockets.on("connection", function (socket) {
  let roomName = null;
  socket.on("join", function (data) {
    roomName = data;
    socket.join(data);
  });
  socket.on("message", function (data) {
    io.sockets.in(roomName).emit("message", "test");
  });
});
