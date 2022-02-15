const fs = require("fs");
const ejs = require("ejs");
const http = require("http");
const express = require("express");
const { log } = require("console");

var counter = 0;
function Product(name, image, price, count) {
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

var products = [
  new Product("JavaScript", "chrome.png", 28000, 30),
  new Product("JavaScript", "chrome.png", 28000, 30),
  new Product("JavaScript", "chrome.png", 28000, 30),
  new Product("JavaScript", "chrome.png", 28000, 30),
  new Product("JavaScript", "chrome.png", 28000, 30),
  new Product("JavaScript", "chrome.png", 28000, 30),
  new Product("JavaScript", "chrome.png", 28000, 30),
];

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
  var htmlPage = fs.readFileSync("HTMLPage.html", "utf8");
  res.send(
    ejs.render(htmlPage, {
      products: products,
    })
  );
});

server.listen(52274, function () {
  console.log("server is running");
});

var io = require("socket.io")(server);

io.sockets.on("connection", function (socket) {
  function onReturn(index) {
    products[index].count++;
    clearTimeout(cart[index].timerID);
    delete cart[index];
    io.sockets.emit("count", { index: index, count: prodcuts[index].count });
  }
  var cart = {};
  socket.on("cart", function (index) {
    products[index].count--;
    cart[index] = {};
    cart[index].index = index;
    cart[index].timerID = setTimeout(function () {
      onReturn(index);
    }, 10 * 60 * 1000);
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  });

  socket.on("buy", function (index) {
    clearTimeout(cart[index].timerID);
    delete cart[index];
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  });

  socket.on("return", function (index) {
    onReturn(index);
  });
});
