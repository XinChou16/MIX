/**
 * count
 */
function countSort(list, maxValue) {
  let len = list.length;
  let i,
    j,
    sortedIndex = 0;
  let bucket = new Array(maxValue + 1);

  for (i = 0; i < len; i++) {
    if (!bucket[list[i]]) {
      bucket[list[i]] = 0;
    }
    bucket[list[i]]++;
  }

  for (j = 0; j < bucket.length; j++) {
    while (bucket[j] > 0) {
      list[sortedIndex] = j;
      bucket[j]--;
      sortedIndex++;
    }
  }

  return list;
}
