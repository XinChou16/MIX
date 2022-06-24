// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
/**
 * @param {number[]} prices
 * @return {number}
 */
// [7,1,5,3,2,6,4,9]
// 1,5  3,6   4,9 = 4+3+5=12
// 思路：分区间，类似股票买卖第一期
// 先找到第一个最大的数，然后接着找下一个最大数，这里需要重新设置下最小的数，开始区间
var maxProfit = function(prices) {
    let i, len = prices.length;
    let max = 0; // 累计最大值
    let stepMax = 0; // 每段的最大值
    let stepMin = prices[0];

    for (i = 1; i < len; i++) {
        // 当前数小于最小的数
        if (prices[i] < stepMin) {
            stepMin = prices[i];
        } else {
            let subtract = prices[i] - stepMin;
            // 当前区间第一次遇到最大数
            if (subtract > stepMax) {
                stepMax = subtract;
                max += stepMax;

                // 重置当前区间 step 参数，计算下一个区间
                stepMax = 0;
                stepMin = prices[i];
            }
        }
        // console.log({ i, stepMin, stepMax })
    }

    return max;
};