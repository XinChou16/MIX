/**
 * flat
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 */

function polyfillFlat() {
    if (!Array.prototype.flat) {
        Object.defineProperty(Array.prototype, 'flat', {
            configurable: true,
            writable: true,
            value: function(depth) {
                var flat = function(arr, depth) {
                    const reducer = function(acc, item) {
                        if (Array.isArray(item)) {
                            return acc.concat(flat(item, depth - 1));
                        } else {
                            return acc.concat(item);
                        }
                    }
                    return depth > 0
                        ? arr.reduce(reducer, [])
                        : arr.slice();
                }

                return flat(this, arguments[0] || 1);
            }
        });
    }
}