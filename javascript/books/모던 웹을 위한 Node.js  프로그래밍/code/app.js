const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == "/") {
      fs.readFile("page1.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (pathname == "/page2") {
      fs.readFile("page2.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  })
  .listen(52273, function () {
    console.log("server is listening on port ");
  });
