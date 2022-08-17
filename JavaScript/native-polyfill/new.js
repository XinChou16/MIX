/**
 * new Ctor(params);
 * https://juejin.cn/post/6873513007037546510
 */

function makeInstance(Ctor, ...args) {
    var instance = {};

    Object.setPrototypeOf(instance, Ctor.prototype);
    var res = Ctor.apply(instance, args);
    
    if (res && typeof res === 'object') {
        return res;
    }

    return instance;
}