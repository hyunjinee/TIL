const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const moment = require("moment");
const app = express();
const fs = require("fs");

var server = http
  .createServer(function (req, res) {
    fs.readFile("HTMLPage.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(52274, function () {
    console.log("running");
  });

var io = socketio(server);
io.sockets.on("connection", function (socket) {
  socket.on("message", function (data) {
    io.sockets.emit("message", data);
  });
});
