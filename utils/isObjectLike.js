/**
 * 检测某个值是否为对象类型
 * @param {any} val 变量
 */
module.exports = function isObjectLike(val) {
  return val !== null && typeof val === 'object';
}
