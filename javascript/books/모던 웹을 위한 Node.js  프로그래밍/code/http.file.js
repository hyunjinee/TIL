const fs = require("fs");
const http = require("http");

http
  .createServer(function (req, res) {
    fs.readFile("HTMLPAGE.html", function (error, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(52273, function () {
    console.log("server is running on 52273");
  });
