/**
 * 88 合并两个有序数组
 *
 * 与最大路径和题目有点类似
 *
 * @see https://leetcode.cn/problems/merge-sorted-array/
 *
 * TIME: o(m + n)
 * SPACE: o(m + n)
 */

function merge (nums1, nums2) {
  let l1 = nums1.length;
  let l2 = nums2.length;
  let i = 0, j = 0;
  let ret = [];

  while (i < l1 && j < l2) {
    if (nums1[i] < nums2[j]) {
      // 第一个数组元素更小
      ret.push(nums1[i]);
      i++; // 指针右移
    }
    else if (nums1[i] > nums2[j]) {
      // 第二个数组元素更小
      ret.push(nums2[j]);
      j++; // 指针右移
    }
    else {
      // 数字相等，添加一项进去
      ret.push(nums1[i]);
      i++;
      j++;
    }
  }
  // 补充剩余排好序的元素，两个循环，只会循环一个
  while (i < l1) {
    ret.push(nums1[i++]);
  }

  // 补充剩余的元素，这里是排好序的，直接添加即可
  while (j < l2) {
    ret.push(nums2[j++]);
  }

  return ret;
}

var nums1 = [1, 2, 3];
var nums2 = [2, 5, 8];

nums1 = [2, 8, 120];
nums2 = [2, 90, 110, 112, 125];

console.log(merge(nums1, nums2));
