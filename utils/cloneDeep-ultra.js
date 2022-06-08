/**
 * deepClone
 * @param {*} value to be copied value
 * @param {*} cache cache for obj
 * @returns 
 */
function deepClone3(value, cache = new WeakMap()) {
    if (!isObject(value)) {
        return value;
    }

    // circular loop
    const exist = cache.get(value);
    if (exist) {
        return exist;
    }

    // 函数
    if (typeof value === 'function') {
        return new Function(`return ${value.toString()}`)();
    }
    // 日期 正则
    else if ([Date, RegExp].includes(value.constructor)) {
        return new value.constructor(value);
    }
    // Map
    else if (value instanceof Map) {
        const ret = new Map();
        cache.set(value, ret);

        // 将原 Map 中的数据全部拷贝到新 Map 中
        value.forEach((value, key) => {
            ret.set(
                key,
                isObject(value) ? deepClone3(value, cache) : value
            );
        });
        return ret;
    }
    // Set
    else if (value instanceof Set) {
        const ret = new Set();
        cache.set(value, ret);

        // 将原 Set 中的数据全部拷贝到新 Set 中
        value.forEach(value => {
            ret.add(
                isObject(value) ? deepClone3(value, cache) : value
            );
        });
        return ret;
    }
    else {
        // 其他类型，Array Object .etc
        
        // 获取所有的key, 包括Symbol等不可枚举的
        // 不需要symbol key，也可使用 getOwnPropertyNames
        const keys = Reflect.ownKeys(value);

        // descriptors 获取数据的 enumerable等属性，如不需要拷贝不可枚举的属性，可以去除
        const descriptors = Object.getOwnPropertyDescriptors(value);

        // 基于原型创建新的对象，如果不需要拷贝原型上的属性，第一个参数传入null即可
        const ret = Object.create(Object.getPrototypeOf(value), descriptors);

        keys.forEach(key => {
            const val = value[key];
            ret[key] = isObject(val) ? deepClone3(val, cache) : val;
        });

        cache.set(value, ret);

        return ret;
    }
}

function isObject(obj) {
    return (obj && typeof obj === 'object') || typeof obj === 'function';
}
