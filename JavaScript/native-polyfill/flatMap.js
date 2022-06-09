/**
 * flatMap
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 */

function polyfillFlatMap() {
    if (!Array.prototype.flatMap) {
        Object.defineProperty(Array.prototype, 'flatMap', {
            configurable: true,
            writable: true,
            value: function() {
                return Array.prototype.map.apply(this, arguments).flat(1);
            }
        });
    }
}