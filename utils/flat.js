/**
 * flat
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 * https://github.com/behnammodi/polyfill/blob/master/array.polyfill.js
 * https://github.com/zloirock/core-js#ecmascript-array
 */
// 适用于最大层级1
function flat1(arr) {
    return arr.reduce((acc, item) => acc.concat(item), []);
}

// 适用于多层级
function flat2(arr, depth = 1) {
    const reducer = function(acc, item) {
        if (Array.isArray(item)) {
            return acc.concat(flat2(item, depth - 1));
        } else {
            return acc.concat(item);
        }
    }
    return depth > 0
        ? arr.reduce(reducer, [])
        : arr.slice();
}

function flat3(arr) {
    const stack = [...arr];
    const ret = [];

    while(stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            ret.push(next);
        }
    }

    return ret.reverse();
}

// test data
const arr1 = [1, 2, [3, 4]];

const arr2 = [1, 2, [3, 4, [5, 6]]];

const arr3 = [1, 2, [3, 4, [5, 6, [7, 8]]]];

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

const ret = flat3(arr3, 10);
