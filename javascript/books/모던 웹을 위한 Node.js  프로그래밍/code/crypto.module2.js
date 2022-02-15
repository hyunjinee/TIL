const crypto = require("crypto");

let key = "비밀키";
let input = "PASSWORD";

let cipher = crypto.createCipher("aes192", key);
cipher.update(input, "utf-8", "base64");
let cipheredOutput = cipher.final("base64");

let decipher = crypto.createDecipher("aes192", key);
decipher.update(cipheredOutput, "base64", "utf-8");
let decipheredOutput = decipher.final("utf8");
