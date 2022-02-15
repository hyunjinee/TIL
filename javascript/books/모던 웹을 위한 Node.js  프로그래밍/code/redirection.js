const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    res.writeHead(302, { Location: "http://www.hanbit.co.kr" });
    res.end();
  })
  .listen(52273, () => {
    console.log("server is listening on port 52273");
  });
