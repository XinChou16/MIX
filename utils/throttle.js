/**
 * 节流方法
 * @param {Function} func 需要节流的方法
 * @param {number} wait 等待时间
 */
module.exports = function throttle(func, wait) {
  var previous = 0;

  return function() {
    var self = this;
    var now = +new Date();

    if (now - previous > wait) {
      func.apply(self, arguments);
      previous = now;
    }
  }
}
