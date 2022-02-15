const express = require("express");

const app = express();

app.get("/page/:id", function (req, res) {
  var name = req.params.id;
  console.log(req.params);
  res.send("<h1>" + name + "</h1>");
});

app.listen(52274, function () {
  console.log("running");
});
