/**
 * 求两个数值中最长路径的最大和
 * @see https://verytoolz.com/blog/3194a5edb2/
 * 
 * 思路：
 * 
 * 1. 数组已经是排过序的，所以，无需比较
 * 2. 新建两条路径，分别计算，在相遇点之前时，两条路径最大值
 * 3. 相遇时，将最大值赋值给结果，并清空两个子路径的最大值
 */

 function maxPathSum(arr1, arr2, m, n) {
    let i = 0, j = 0;
    let result = 0, sum1 = 0, sum2 = 0;

    while (i < m && j < n) {
        if (arr1[i] < arr2[j]) {
            sum1 += arr1[i++];
        } 
        else if (arr1[i] > arr2[j]) {
            sum2 += arr2[j++];
        } 
        else {
            result += Math.max(sum1, sum2);
            result += arr1[i];
            // console.log({sum1, sum2, i,result});

            i++;
            j++;
            sum1 = 0;
            sum2 = 0;
        }
    }

    while (i < m) {
        sum1 += arr1[i++];
    }

    while (j < n) {
        sum2 += arr2[j++];
    }

    result += Math.max(sum1, sum2);

    console.log(result);
    
    return result;
}


// 最长路径为：1-5-7-8-10-12-15-30-34
let ar1 = [2, 3, 7, 10, 12, 15, 30, 34];
let ar2 = [1, 5, 7, 8, 10, 15, 16, 19];

let m = ar1.length;
let n = ar2.length;

let ret = maxPathSum(ar1, ar2, m, n)
// ret