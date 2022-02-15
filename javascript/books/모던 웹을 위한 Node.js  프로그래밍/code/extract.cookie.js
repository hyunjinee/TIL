const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    if (req.headers.cookie) {
      let cookie = req.headers.cookie.split(";").map(function (element) {
        var element = element.split("=");
        return {
          key: element[0],
          value: element[1],
        };
      });
      console.log(cookie);
      res.end("<h1>" + JSON.stringify(cookie) + "</h1>");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie": ["name = hyunjin", "region = daejeon"],
      });
      res.end("<h1>" + "쿠키를 생성했다." + "</h1>");
    }
  })
  .listen(52273, function () {
    console.log("server is listening on port ");
  });
