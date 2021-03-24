/**
 * get the toStringTag of variable
 * @param {any} value
 * @returns {string}
 */
module.exports = function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
};
