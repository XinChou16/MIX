/**
 * 检查某个值是否是个布尔类型的值
 * @param {any} value 待检测的变量
 * @returns {boolean}
 */
module.exports = function isBoolean(value) {
  return value === true || value === false;
}
