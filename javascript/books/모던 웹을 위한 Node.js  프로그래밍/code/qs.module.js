const url = require("url");
const querystring = require("querystring");

const parsedObject = url.parse(
  "http://www.hanbit.co.kr/store/books/look.php?p_code=B4250257160"
);
console.log(querystring.parse(parsedObject.query));
