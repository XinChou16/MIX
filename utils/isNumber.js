module.exports = function isNumber(value) {
  var toString = Object.prototype.toString;
  return (typeof value === 'number') || (toString.call(value) === '[object Number]');
};
