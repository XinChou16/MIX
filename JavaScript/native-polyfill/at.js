/**
 * at polyfill
 * @see https://github.com/tc39/proposal-relative-indexing-method#polyfill
 */

if (!Array.prototype.at || !String.prototype.at) {
    function at(pos) {
        pos = Math.trunc(pos) || 0;

        if (pos < 0) pos += this.length;
        if (pos < 0 || pos >= this.length) return;

        return this[pos];
    }

    for (const Ctor of [Array, String]) {
        Object.defineProperty(Ctor.prototype, 'at', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: at
        });
    }
}
