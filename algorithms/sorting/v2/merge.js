
function mergeSort(list) {
  if (!list || list.length < 2) return list;
  let len = list.length;

  let middle = Math.floor(len / 2);
  let left = list.slice(0, middle);
  let right = list.slice(middle);

  let result = merge(mergeSort(left), mergeSort(right));

  return result;
}

function merge(left, right) {
  let result = [];

  while(left.length && right.length) {
      if (left[0] < right[0]) {
          result.push(left.shift());
      } else {
          result.push(right.shift());
      }
  }
  while(left.length) {
      result.push(left.shift());
  }

  while(right.length) {
      result.push(right.shift());
  }

  return result;

}
