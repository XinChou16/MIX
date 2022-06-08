// test data for deep clone function
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
// https://cloud.tencent.com/developer/article/1540790
// https://blog.csdn.net/cc18868876837/article/details/114918262
const obj1 = {
    // 1. 基础类型
    ['1_num']: 1,
    ['1.1_num']: [NaN, Infinity],
    ['2_str']: 'cool',
    ['3_bool']: true,
    ['4_null']: null,
    ['5_undef']: undefined,
    ['6_symb']: Symbol('cloneMe'),
    ['7_big']: BigInt(1n),
    // 2. 引用类型
    ['8_obj']: {
        name: 'obj',
        id: 1,
    },
    ['9_arr']: ['r', 'g', 'b'],
    ['10_func']: function func() {
        console.log('func');
    },
    ['11_date']: new Date(),
    ['12_reg']: new RegExp('/\d{10}/ig'),
    ['13_map']: new Map([ ['id', '100'] ]),
    ['14_set']: new Set([1, 2, 4]),
    // 3. 其他
    [Symbol('15_unique')]: 'only ME',
};

// 4. 不可枚举属性
Object.defineProperty(obj1, '16_inenumerable', {
    enumerable: false,
    value: 'not enumerable property'
});

// 5. 设置原型对象
Object.setPrototypeOf(obj1, {
    ['proto_17']: 'proto'
});

// 6. 循环引用
obj1['18_loop'] = obj1;
