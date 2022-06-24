/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 https://leetcode.cn/problems/can-place-flowers/solution/jsjie-ti-si-lu-qing-xi-ming-liao-by-inte-is7x/
 */
 var canPlaceFlowers = function(flowerbed, n) {
    let i, len;

    flowerbed.unshift(0);
    flowerbed.push(0);

    for (i = 0, len = flowerbed.length; i < len; i++) {
        if (
            flowerbed[i] === 0 &&
            flowerbed[i - 1] === 0&&
            flowerbed[i + 1] === 0
        ) {
            flowerbed[i] = 1;
            n--;
        }
    }

    return n <= 0;
};
