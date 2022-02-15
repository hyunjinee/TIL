const fs = require("fs");
const http = require("http");
const express = require("express");

var client = require("mysql").createConnection({
  user: "root",
  password: "leehj",
  database: "location",
});

var app = express();
var server = http.createServer(app);

app.get("/tracker", function (req, res) {
  fs.readFile("Tracker.html", function (error, data) {
    res.send(data.toString());
  });
});

app.get("/observer", function (req, res) {
  fs.readFile("Observer.html", function (error, data) {
    res.send(data.toString());
  });
});

app.get("/showdata", function (req, res) {
  client.query(
    "SELECT * FROM locations WHERE name=?",
    [req.params.name],
    function (error, data) {
      res.send(data);
    }
  );
});

server.listen(52274, function () {
  console.log("server is running");
});

var io = require("socket.io")(server);

io.sockets.on("connection", function (socket) {
  socket.on("join", function (data) {
    socket.join(data);
  });
  socket.on("location", function (data) {
    client.query(
      "INSERT INTO locations(name,latitude, longitude, date) VALUES (?,?,?,NOW())",
      [data.name, data.latitude, data.longitude]
    );
    io.sockets.in(data.name).emit("receive", {
      latitude: data.latitude,
      longitude: longitude,
      date: Date.now(),
    });
  });
});
