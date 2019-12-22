module.exports = function fibonacciNth(n) {
    let current = 1;
    let prev = 0;

    // while(--n) {
    //     current += prev;
    //     prev = current - prev;
    // }
    let counter = n - 1;
    while(counter) {
        current += prev;
        prev = current - prev;
        counter -= 1;
    }

    return current;
}

// 1 1 2 3 5 8
function fb(n) {
    let cur = 1;
    let prev = 0;
    let i = 0;
    let len = n - 1;

    for (; i < len; i++) {
        cur += prev;
        prev = cur - prev;
    }

    return cur;
}