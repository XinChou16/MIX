
/**
 * 延迟执行方法指导当前调用栈被清空
 * @param {Function} func 函数
 * @param  {...any} [args] 参数数组
 * @returns {number} 计时器id
 */
export default function(func, ...args) {
  if (typeof func !== 'function') {
    throw new Error('Expected a function');
  }
  return setTimeout(func, 1, ...args);
}
