
// https://zh.wikipedia.org/wiki/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F

const notSortedArr = [6, 5, 3, 1, 8, 10, 2, 4, 2];

/**
 * V1
 */
function selectionSort(notSortedArr) {
    let arr = [...notSortedArr];

    let i, j;
    let len = arr.length;

    for (i = 0; i < len - 1; i++) {
        let min = i;

        // 1. find the min index
        for (j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        // 2. if not match, swap them
        if (min !== i) {
            [ arr[min], arr[i] ] = [ arr[i], arr[min]];
        }
    }
    
    console.log(arr);
    return arr;
}

selectionSort(notSortedArr);

