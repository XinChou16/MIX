
function selectSort(list) {
  let i, j, min;
  let len = list.length;

  for (j = 0; j < len; j++) {
      min = j;

      for (i = j + 1; i < len; i++) {
          if (list[i] < list[min]) {
              min = i;
          }
      }

      if (min != j) {
          [ list[j], list[min] ] = [ list[min], list[j] ];
      }
  }

  return list;
}
