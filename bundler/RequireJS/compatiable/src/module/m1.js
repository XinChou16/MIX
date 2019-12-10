(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(['src/m2'], factory);
    } else {
        global = global || self;
        global.Vue = factory();
    }
})(this, function(m2) {
    console.log('m1-loaded', m2);
    var obj = {
        foo: 'bar'
    }
    return obj;
});
