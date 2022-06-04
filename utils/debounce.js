/**
 * 防抖方法
 * @param {Function} func 需要防抖的方法
 * @param {number} delay 延迟时间
 * @see https://redd.one/blog/debounce-vs-throttle
 * @see https://github.com/jashkenas/underscore/blob/master/modules/debounce.js
 * @see https://underscorejs.org/#debounce
 * @see https://lodash.com/docs/4.17.15#throttle
 */
 module.exports = function debounce(func, delay) {
    let timer;
    return function () {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    }
}

/**
 * 防抖方法
 * @param {Function} func 需要防抖的方法
 * @param {number} delay 延迟时间
 * @param {boolean} immediate 是否立即执行
 */
function debounceWithFlag(func, delay, immediate) {
    let timer;
    return function () {
        timer && clearTimeout(timer);

        if (immediate) {
            timer = setTimeout(() => {
                timer = null;
            }, delay);

            if (!timer) {
                func.apply(this, arguments);
            }
        } else {
            timer = setTimeout(() => {
                func.apply(this, arguments);
            }, delay);
        }
    }
}
