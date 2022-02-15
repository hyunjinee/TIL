const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    if (req.method == "GET") {
      fs.readFile("HTMLPage2.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (req.method == "POST") {
      req.on("data", function (data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>" + data + "</h1>");
      });
    }
  })
  .listen(52273, function () {
    console.log("server is listening on port ");
  });
