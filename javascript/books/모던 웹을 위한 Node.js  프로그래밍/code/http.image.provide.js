const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    fs.readFile("1507.jpg", function (err, data) {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    });
  })
  .listen(52273, () => {
    console.log("server is listening on port 52273");
  });
