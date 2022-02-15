const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

let client = mysql.createConnection({
  user: "root",
  password: "leehj",
  database: "Company",
});

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(52274, function () {
  console.log("server is running");
});

app.get("/", function (req, res) {
  fs.readFile("list.html", "utf8", function (err, data) {
    console.log(data);
    client.query("SELECT * FROM products", function (err, results) {
      res.send(ejs.render(data, { data: results }));
    });
  });
});
app.get("/delete/:id", function (req, res) {
  client.query("DELETE FROM products WHERE id=?", [req.params.id], function () {
    res.redirect("/");
  });
});
app.get("/insert", function (req, res) {
  fs.readFile("insert.html", "utf8", function (err, data) {
    res.send(data);
  });
});
app.post("/insert", function (req, res) {
  let body = req.body;

  client.query(
    "INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)",
    [body.name, body.modelnumber, body.series],
    function () {
      res.redirect("/");
    }
  );
});
app.get("/edit/:id", function (req, res) {
  fs.readFile("edit.html", "utf8", function (err, data) {
    client.query(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id],
      function (err, result) {
        console.log(result);
        res.send(ejs.render(data, { data: result[0] }));
      }
    );
  });
});
app.post("/edit/:id", function (req, res) {
  let body = req.body;
  client.query(
    "UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?",
    [body.name, body.modelnumber, body.series, req.params.id],
    function () {
      res.redirect("/");
    }
  );
});
