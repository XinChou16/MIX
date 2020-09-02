function decode(s) {
  return s.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
}
function getCookie(key) {
  if (typeof document === "undefined" || (arguments.length && !key)) {
    return;
  }
  var cookies = document.cookie ? document.cookie.split("; ") : [];
  var jar = {};
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("=");
    var cookie = parts.slice(1).join("=");

    if (cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1);
    }

    try {
      var name = decode(parts[0]);
      jar[name] = decode(cookie);

      if (key === name) {
        break;
      }
    } catch (e) {}
  }
  return key ? jar[key] : jar;
}
