
function baseNumSort(list) {
  // 1. 新建10个桶，代表0-9的数字
  // 2. 遍历数组，将数字对应的个位数添加到对应桶中
  // 3. 将桶的数字添加回原数组中
  // 4. 清空桶
  // 5. 遍历数组，将数字对应的十位数添加到对应桶中
  // 6. 将桶的数字按顺序添加回原数组当中
  // https://www.runoob.com/w3cnote/radix-sort.html
  if (!list || list.length <= 1) {
      return list;
  }

  let i, j, s, m;
  let len = list.length;
  let bucket = Array.from({ length: 10 });

  function rewriteListWithBucket() {
      list.length = 0;
      for (i = 0; i < 10; i++) {
          j = bucket[i].length;
          while (j) {
              list.push(bucket[i].shift());
              j--;
          }
      }
  }

  for (i = 0; i < 10; i++) {
      bucket[i] = [];
  }

  for (i = 0; i < len; i++) {
      s = getSplitNum(list[i])[0];
      bucket[s].push(list[i]);
  }

  rewriteListWithBucket();

  for (i = 0; i < len; i++) {
      m = getSplitNum(list[i])[1];
      bucket[m].push(list[i]);
  }

  rewriteListWithBucket();

  return list;
}

function getSplitNum(number) {
  let m = Math.floor(number / 10); // 十位
  let s = number - m * 10; // 个位；
  return [s, m];
}
