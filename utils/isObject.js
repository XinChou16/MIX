/**
 * 判断一个值是否为对象
 * @param {any} val 值
 */
module.exports = function isObject(val) {
  var type = typeof val;
  return value != null && (type === 'object' || type === 'function');
}
