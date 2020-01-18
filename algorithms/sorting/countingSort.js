
// https://www.itcodemonkey.com/article/11750.html

const notSortedArr = [6, 5, 3, 1, 8, 10, 2, 4, 2];

/**
 * V1
 */
function calcSort(notSortedArr) {
    let arr = [...notSortedArr];

    // 1. get max and min value
    let max = Reflect.apply(Math.max, Math, arr);
    let min = Reflect.apply(Math.min, Math, arr);
    
    // 2. create a max-min+1 length arr
    let arr2 = Array(max - min + 1).fill(0);
    
    // 3. loop arr
    for (let i = 0, len = arr.length; i < len; i++) {
        let j = arr[i];
        arr2[j] += 1;
    }

    // 4. generate sorted arr
    let result = [];
    for (let k = 0; k < (max - min + 1); k++) {
        for (z = 0; z < arr2[k]; z++) {
            result.push(k);
        }
    }
    console.log(result);
    return result;
}

calcSort(notSortedArr);

