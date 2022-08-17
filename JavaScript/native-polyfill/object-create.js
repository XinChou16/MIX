/**
 * object.create(obj, properties)
 */

function polyfillObjectCreate() {
    if (!Object.create) {
        Object.create = function(source, properties) {
            function F() {}
            F.prototype = source;
            var obj = new F();

            if (properties && typeof properties === 'object') {
                Object.defineProperties(obj, properties);
            }

            return obj;
        }
    }
}