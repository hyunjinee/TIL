const socketio = require("socket.io");
const express = require("express");

const http = require("http");
const ejs = require("ejs");
const fs = require("fs");

var app = express();
app.use(express.static("public"));

var server = http.createServer(app);
server.listen(52274, function () {
  console.log("Server is running");
});

app.get("/", function (req, res) {
  fs.readFile("lobby.html", function (error, data) {
    res.send(data.toString());
  });
});

app.get("/canvas/:room", function (req, res) {
  fs.readFile("canvas.html", "utf8", function (error, data) {
    res.send(ejs.render(data, { room: req.params.room }));
  });
});

app.get("/room", function (req, res) {
  console.log(io.sockets.adapter);
  var rooms = Object.keys(io.sockets.adapter.rooms).filter(function (item) {
    return item.indexOf("/") < 0;
  });
  res.send(rooms);
});

var io = socketio(server);
io.sockets.on("connection", function (socket) {
  var roomId = "";
  socket.on("join", function (data) {
    socket.join(data);
    roomId = data;
  });
  socket.on("draw", function (data) {
    io.sockets.in(roomId).emit("line", data);
  });
  socket.on("create_room", function (data) {
    io.sockets.emit("create_room", data.toString());
  });
});
