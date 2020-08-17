/**
 * 延迟执行方法
 * @param {Function} func 延迟执行的方法
 * @param {number} wait 延迟时间，单位毫秒
 * @param  {...any} args 剩余参数
 */
module.exports = function delay(func, wait, ...args) {
  if (typeof func !== 'function') {
    throw new Error('Function is needed');
  }
  setTimeout(func, wait, ...args);
}
