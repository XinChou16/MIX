
function insertSort(list) {
  let len = list.length;
  let i, j, item;

  // 迭代数组
  for (j = 1; j < len; j++) {
      // 在排好序的列表中插入新项
      for (i = 0; i < j; i++) {
          if (list[j] <= list[i]) {
              // 插入到比它值小的前面位置
              item = list.splice(j, 1)[0];
              list.splice(i, 0, item);
          }
      }
  }

  return list;
}
