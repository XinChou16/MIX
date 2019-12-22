function insertionSort(sortArr) {
    let arr = [...sortArr];

    for (let i = 1; i < arr.length; i++) {
        /**
         * i = 1; j 0
         * i = 2; j 1, 0
         * i = 3; j 2, 1, 0
         */
        for (let j = i - 1; j >= 0; j--) {
            if (typeof arr[j + 1] !== 'undefined' && arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

module.exports = insertionSort;
