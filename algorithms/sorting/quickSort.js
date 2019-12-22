module.exports = function quickSort(sortArr) {
    let arr = [...sortArr];
    // 6, 5, 3, 1, 8, 17, 2, 4

    if (arr.length <= 1) {
        return arr;
    }

    // pick the first element as pivot
    let pivot = arr[0];

    // init arrs
    let centerArr = [];
    let leftArr = [];
    let rightArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === pivot) {
            centerArr.push(arr[i]);
        } else if (arr[i] > pivot) {
            rightArr.push(arr[i]);
        } else {
            leftArr.push(arr[i]);
        }
    }

    let leftSortedArr = quickSort(leftArr);
    let rightSortedArr = quickSort(rightArr);

    return [...leftSortedArr, ...centerArr, ...rightSortedArr];
};

// function quickSort(sortArr) {
//     let arr = [...sortArr];
//     // 6, 5, 3, 1, 8, 17, 2, 4

//     if (arr.length <= 1) {
//         return arr;
//     }

//     // pick the first element as pivot
//     let pivot = arr.shift();

//     // init arrs
//     let centerArr = [pivot];
//     let leftArr = [];
//     let rightArr = [];

//     // loop the arr
//     while (arr.length) {
//         let current = arr.shift();

//         if (current === pivot) {
//             centerArr.push(current);
//         } else if (current > pivot) {
//             rightArr.push(current);
//         } else {
//             leftArr.push(current);
//         }
//     }

//     let leftSortedArr = quickSort(leftArr);
//     let rightSortedArr = quickSort(rightArr);

//     // recursive left arr
//     return [...leftSortedArr, ...centerArr, ...rightSortedArr]
// }
