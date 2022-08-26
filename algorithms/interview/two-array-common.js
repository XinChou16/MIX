/**
 * 获取两个数组的交集
 */
function getCommon(arr1, arr2) {
    let i = 0, j = 0;
    let l1 = arr1.length, l2 = arr2.length;
    const map = {};
    const ret = [];

    for (const item of arr1) {
        if (!ret[item]) {
            ret[item] = true;
        }
    }

    for (const item of arr2) {
        if (map[item]) {
            ret.push(item);
        }
    }

    return ret;
}

var nums1 = [1, 2, 2, 1], nums2 = [2, 2, 3, 4];
var ret = getCommon(nums1, nums2);
console.log(ret)