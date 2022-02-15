const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    res.writeHead(404);
    res.end();
  })
  .listen(52273, () => {
    console.log("server is listening on port 52273");
  });
