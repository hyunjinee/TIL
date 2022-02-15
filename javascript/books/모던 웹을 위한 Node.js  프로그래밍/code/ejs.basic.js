var http = require("http");
var fs = require("fs");
var ejs = require("ejs");

http
  .createServer(function (req, res) {
    fs.readFile("ejsPage.ejs", "utf8", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(ejs.render(data));
    });
  })
  .listen(52273, function () {
    console.log("server running");
  });
