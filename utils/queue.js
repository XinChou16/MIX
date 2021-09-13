/**
 * 依次执行队列的方法
 * @param {any[]} queue 队列
 * @param {Function} fn 迭代器
 * @param {Function} cb 回调
 */
function runQueue(queue, fn, cb) {
  var step = (index) => {
    if (index >= queue.length) {
      cb();
    } else {
      fn(queue[index], () => {
        step(index + 1);
      });
    }
  };

  step(0);
}

module.exports = runQueue;
