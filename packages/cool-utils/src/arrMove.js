var arr = ['r', 'g', 'b'];

var initIndex = 1;
var r;

function swap(arr, oldIndex, newIndex) {
  arr[newIndex] = arr.splice(oldIndex, 1, arr[newIndex])[0];
  return arr;
}

function moveForward(arr, index) {
  if (index > 0 && index < arr.length) {
    arr[index] = arr.splice(index - 1, 1, arr[index])[0];
    return arr;
  }
}

function moveBackward(arr, index) {
  var len = arr.length - 1;

  if (index > -1 && index < len) {
    arr[index] = arr.splice(index + 1, 1, arr[index])[0];

    return arr;
  }
}

// r = swap(arr, 0, 2);
// 1, 2
// r = moveForward(arr, 2);

// 0, 1
r = moveBackward(arr, 2);

console.log(r);
