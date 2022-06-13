/**
 * queueMicrotask
 * 
 * @see https://github.com/ungap/queue-microtask/blob/main/index.js
 */

const self = this || {};

if (typeof self.queueMicrotask === 'undefined') {
    try {
        let p = Promise.resolve();
        self.queueMicrotask = p.then.bind(p);
    } catch (e) {
        self.queueMicrotask = function queueMicrotask(fn) {
            setTimeout(fn, 0);
        }
    }
}