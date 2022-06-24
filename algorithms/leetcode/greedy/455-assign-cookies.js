/**
 * 455 - https://leetcode.cn/problems/assign-cookies/
 * 
 * @see https://leetcode.cn/problems/assign-cookies/solution/jsjie-ti-si-lu-qing-xi-ming-liao-by-inte-7se3/
 */

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
 const findContentChildren = function(g, s) {
    if (!g.length || !s.length) return 0;

    let sorter = (a, b) => a - b
    g.sort(sorter);
    s.sort(sorter);

    let count1 = 0;
    let count2 = 0;

    // 其中一个数组遍历到结尾菜结束
    while(count1 < g.length && count2 < s.length) {
        // 双指针，孩子有饼干吃，才移动一位
        if (g[count1] <= s[count2]) {
            count1++;
        }
        count2++;
    }

    return count1;
};