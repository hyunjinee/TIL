var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
var jade = require("jade");
http
  .createServer(function (req, res) {
    fs.readFile("JadePage.jade", "utf8", function (err, data) {
      var fn = jade.compile(data);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fn());
    });
  })
  .listen(52273, function () {
    console.log("server running");
  });
