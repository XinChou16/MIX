function bucketSort(list, bucketSize = 5) {
  // 1. 算出最大小值
  // 2. 初始化桶
  // 3. 将数据塞到桶中
  // 4. 将每个桶排序，同时生成排序后的数组
  if (!list || list.length <= 1) {
      return list;
  }

  let i, min, max, j;
  let len = list.length;
  min = max = list[0];

  // 1. 算出最大小值
  for (i = 0; i < len; i++) {
      if (list[i] < min) {
          min = list[i];
      }
      if (list[i] > max) {
          max = list[i];
      }
  }

  // 2. 初始化桶
  let bucketCount = Math.floor((max - min) / bucketSize) + 1;
  let bucket = Array.from({ length: bucketCount });

  for (i = 0; i < bucketCount; i++) {
      bucket[i] = [];
  }

  // 3. 将数据塞到桶中
  for (i = 0; i < len; i++) {
      j = Math.floor((list[i] - min) / bucketSize);
      bucket[j].push(list[i]);
  }

  list.length = 0;
  // 4. 将每个桶排序，同时生成排序后的数组
  for (j = 0; j < bucketCount; j++) {
      sort(bucket[j]);
      for (i = 0; i < bucket[j].length; i++) {
          list.push(bucket[j][i]);
      }
  }

  return list;
}

function sort(list) {
  list.sort((a, b) => a - b);
}
