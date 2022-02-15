const EventEmitter = require("events");

exports.timer = new EventEmitter();

setInterval(function () {
  exports.timer.emit("tick");
}, 1000);
