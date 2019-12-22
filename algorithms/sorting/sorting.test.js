const bubbleSort = require('./bubbleSort');

const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8];
const reverseArr = [8, 7, 6, 5, 4, 3, 2, 1];
const notSortedArr = [6, 5, 3, 1, 8, 17, 2, 4];
const equalArr = [1, 1, 1, 1, 1, 1, 1, 1];
const negativeArr = [-1, 0, 5, -10, 20, 13, -7, 3];
const negativeArrSorted = [-10, -7, -3, -1, 0, 2, 3, 5];
const nativeSort = (arr) => arr.sort((a, b) => (a - b));

it('bubble sort test', () => {
    expect(bubbleSort(notSortedArr)).toEqual(nativeSort(notSortedArr));
});
