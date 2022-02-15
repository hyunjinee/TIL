const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
let routes = require("./routes/index");
let users = require("./routes/users");

const app = express();

app.set("case sensitive routes", true);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/users", users);

app.use("/product", function (req, res) {
  res.render("product", { title: "Product Page" });
});
app.use("/product/insert", function (req, res) {
  res.render("product/insert", { title: "Insert Page" });
});
app.use("/product/edit", function (req, res) {
  res.render("product/edit", { title: "Edit Page" });
});
module.exports = app;
