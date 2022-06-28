// https://leetcode.cn/problems/fibonacci-number/submissions/
/**
 * @param {number} n
 * @return {number}
 */
// 0 1 1 2 3 5 8
// 递归
var fib1 = function(n) {
    if (n < 2) return n;
    
    return fib1(n - 1) + fib1(n - 2);
};

// 递归优化
var fib2 = function(n) {
    if (n < 2) return n;
    fib2.cache = fib2.cache || {};
    
    if (fib2.cache[n]) {
        // console.log({n})
        return fib2.cache[n];
    } else {
        fib2.cache[n] = fib2(n - 1) + fib2(n -2);
    }
    
    return fib2.cache[n];
}

// 循环方法
// TIME: o(n)
// SPACE: o(1)
var fib3 = function(n) {
    if (n < 2) return n;
    
    let prevv = 1;
    let prev = 1;
    let val = 1;
    
    for (let i = 2; i < n; i++) {
        val = prev + prevv;
        prevv = prev;
        prev = val;
    }
    
    return val;
}

// dp方法
var fib4 = function(n) {
    if (n < 2) return n;
    
    var dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}


var fib = fib4;