(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global = global || self;
        global.Vue = factory();
    }
})(this, function() {
    console.log('m2-loaded');
    return 'm2';
});
