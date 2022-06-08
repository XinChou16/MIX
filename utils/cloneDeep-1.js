
function deepCloneSimple(obj) {
    try {
        // 无法拷贝
        // 5_undef
        // 6_symbol
        // 7_big 报错
        // 10_func
        // 11_date 变成字符串
        // 12_reg 变成空对象
        // 13_map 变成空对象
        // 14_set 变成空对象
        // 18_loop 报错
        return JSON.parse(JSON.stringify(obj));
    } catch (o_O) {
        return obj;
    }
}
