
function bubbleSort(list) {
  let len = list.length;
  let tmp;

  for (let j = 0; j < len; j++) {
      for (let i = 1; i < len - j; i++) {
          if (list[i - 1] > list[i]) {
              tmp = list[i - 1];
              list[i - 1] = list[i];
              list[i] = tmp;
          }
      }
  }

  return list;
}
