const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    fs.readFile("", function (err, data) {
      res.writeHead(200, { "Content-Type": "audio/mp3" });
      res.end(data);
    });
  })
  .listen(52273, () => {
    console.log("server is listening on port 52273");
  });
