/**
 * 字符串组合
 * 输入'abc'
 * 输出所有可能的字符串组合
 */

function getStringCombine(arr) {
    let ret = [];

    const loop = (word) => {
        if (word.length === arr.length) {
            return ret.push(word);
        }
        for (let i = 0; i < arr.length; i++) {
            if (word.includes(arr[i])) continue;
            loop(word + arr[i]);
        }
    }

    loop('');

    return ret;
}

let arr = ['a', 'b', 'c'];
let ret = getStringCombine(arr);
