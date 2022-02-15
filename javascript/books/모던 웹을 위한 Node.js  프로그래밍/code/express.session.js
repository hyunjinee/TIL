const express = require("express");
const session = require("express-session");

const app = express();
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res) {
  req.session.now = new Date().toUTCString();
  res.send(req.session);
});

app.listen(52274, function () {
  console.log("server is running");
});
