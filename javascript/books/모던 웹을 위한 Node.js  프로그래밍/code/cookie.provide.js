const http = require("http");

http
  .createServer(function (req, res) {
    var date = new Date();
    date.setDate(date.getDate() + 7);
    res.writeHead(200, {
      "Content-type": "text/html",
      "Set-cookie": [
        "breakfast=toast;Expires=" + date.toUTCString(),
        "dinner = chicken",
      ],
    });
    res.end(req.headers.cookie);
  })
  .listen(52273, () => {
    console.log("server is listening on port 52273");
  });
