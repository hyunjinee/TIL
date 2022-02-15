const crypto = require("crypto");

const shasum = crypto.createHash("sha256");
shasum.update("cypto_hash");
const output = shasum.digest("hex");

console.log("crypto_hash:", output);
