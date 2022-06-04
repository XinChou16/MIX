/**
 * 节流方法 - 时间戳
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
/**
 * 节流方法 - 定时器
 * @param {Function} func 需要节流的方法
 * @param {number} wait 等待时间
 * @see [demo-throttle](https://jsbin.com/valeboponi/edit?html,output)
 */
function throttleWithTimeout(func, wait) {
  var ready = true;

  return function() {
    if (!ready) {
      return;
    }

    ready = false;
    func.apply(this, arguments);

    setTimeout(() => {
      ready = true;
    }, wait);
  }
}
