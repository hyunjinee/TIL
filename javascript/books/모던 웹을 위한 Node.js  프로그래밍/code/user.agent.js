const express = require("express");

const app = express();

app.use(function (req, res) {
  let agent = req.header("User-Agent");
  let host = req.header("Host");
  console.log(host);
  console.log(req.headers);
  //   console.log(req.headers);
  console.log(agent);
  res.sendStatus(200);
});

app.listen(52274, function () {
  console.log("running");
});
