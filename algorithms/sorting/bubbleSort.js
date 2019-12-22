function bubbleSort(sortArr) {
    let arr = [...sortArr];

    for (let i = 1; i < arr.length; i++) {
        /**
         * loop 7s
         * loop 6s
         */
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// function fb(sortArr) {
//     let arr = [...sortArr];
//     // 6, 5, 3, 1, 8, 17, 2, 4
//     let z = 0;

//     for (let i = 1; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i; j++) {
//             z++;
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//         }
//     }
    
//     console.log(z, arr);
// }

module.exports = bubbleSort;
