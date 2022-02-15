//메모이제이션 기법

function memorize(f) {
  var cache = {};
  return function () {
    var key = "";
    for (var i = 0; i < arguments.length; i++) key += arguments[i] + ",";
    if (cache[key] == undefined) cache[key] = f.apply(null, arguments);
    return cache[key];
  };
}
