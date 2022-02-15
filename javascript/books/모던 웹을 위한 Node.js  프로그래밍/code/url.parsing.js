const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    var query = url.parse(req.url, true).query;
    console.log(query);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>" + JSON.stringify(query) + "</h1>");
  })
  .listen(52273, function () {
    console.log("server is listening on port ");
  });
