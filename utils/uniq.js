
/**
 * 去重
 * @param {any[]} 数组
 * @returns 数组
 * @see https://dev.to/soyleninjs/3-ways-to-remove-duplicates-in-an-array-in-javascript-259o
 * @see https://levelup.gitconnected.com/7-ways-to-remove-duplicates-from-array-in-javascript-cea4144caf31
 * @see https://github.com/jashkenas/underscore/blob/master/modules/uniq.js
 */
 function unique1(arr) {
    return Array.from(new Set(arr));
    // return [...new Set(arr)];
}

function unique2(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    });
}

function unique3(arr) {
    let ret = [];
    arr.forEach(item => {
        if (!ret.includes(item)) {
            ret.push(item);
        }
    });
    return ret;
}

function unique4(arr) {
    let hash = {};
    let ret = [];
    arr.forEach(item => {
        if (!hash[item]) {
            hash[item] = item;
            ret.push(item);
        }
    });
    return ret;
}

function unique5(arr) {
    let hash = new Map();
    let ret = [];
    arr.forEach(item => {
        if (!hash.has(item)) {
            hash.set(item, item);
            ret.push(item);
        }
    });
    return ret;
}

function unique6(arr, key) {
    const ret = new Map(
        arr.map(item => [key(item), item])
    );
    return [...ret.values()];
}

var arr = [1, 3, 6, 6, 7, 9, 0];

var obj = { name: '1' };

var arr2 = [3,4, obj, obj];

var arr3 = [
    { name: 'cool', age: 25 },
    { name: 'sandy', age: 22 },
    { name: 'cool', age: 26 },
    { name: 'cool', age: 276 },
];

var r = unique6(arr3, it => it.name);
