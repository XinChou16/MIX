// 1 1 2 3 5 8
function fibonacci(n) {
    let cur = 1;
    let prev = 0;
    let i = 0;
    let len = n - 1;
    let arr = [];

    // if (n === 1) return [n];

    for (; i < len; i++) {
        arr.push(cur);
        cur += prev;
        prev = cur - prev;
    }

    return arr.concat(cur);
}

// function fb(n) {
//     let cur = 1;
//     let prev = 0;
//     let arr = [1];
//     let i = n - 1;

//     while (i) {
//         cur += prev;
//         prev = cur - prev;
//         arr.push(cur);
//         i--;
//     }
//     return arr;
// }

// function fb(nth) {
//     let cur = 1;
//     let prev = 0;
//     let arr = [1];

//     for (let i = 1; i < nth; i++) {
//         cur = (cur + prev);
//         prev = (cur - prev);
//         arr.push(cur);
//     }

//     console.log(arr);
//     return arr;
// }

module.exports = fibonacci;
