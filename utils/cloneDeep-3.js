/**
 * 深拷贝
 * @param {any} obj to be copyed variable
 * @returns 
 */
function deepClone2(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    // 无法拷贝的情形
    // 7_big 报错
    // 11_date 变成字符串
    // 12_reg 变成空对象
    // 13_map 变成空对象
    // 14_set 变成空对象
    // 15_symbol 丢失
    // 16_inenumerable 丢失
    // 18_loop 报错
    
    let cloned = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        const val = obj[key];
        if (val && typeof val === 'object') {
            cloned[key] = deepClone2(val);
        } else {
            cloned[key] = val;
        }
    }

    return cloned
}
