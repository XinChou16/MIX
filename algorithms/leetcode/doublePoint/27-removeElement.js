/**
 * 移除元素
 * https://leetcode.cn/problems/remove-element/
 */

const removeElement = function (nums, val) {
    // 不用管返回长度后面的数据，直接即可
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== val) {
            nums[left] = nums[right];
            left++;
        }
    }

    return left;
}
