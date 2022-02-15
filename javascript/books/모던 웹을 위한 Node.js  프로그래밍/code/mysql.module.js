const mysql = require("mysql");

let client = mysql.createConnection({
  user: "root",
  password: "leehj",
});

client.query("USE Company");
client.query("SELECT * FROM products", function (err, result, fields) {
  if (err) {
    console.log("쿼리 문장에 오류있음");
  } else {
    console.log(result);
  }
});
