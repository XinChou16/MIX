exports.getMaxSeriesArrLength = function getMaxSeriesArrLength(arr) {
  let maxLen = 1;
  let count = 1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] - arr[i] === 1) {
      count++;
      if (maxLen < count) {
        maxLen = count;
      }
    } else {
      count = 1;
    }
  }

  return maxLen;
};

function getMaxArrLen(arr) {
  return getMaxSeriesArr(arr).length;
}

exports.getMaxSeriesArr = function (arr) {
  let maxList = [arr[0]];
  let tmpList = [arr[0]];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] - arr[i] === 1) {
      tmpList.push(arr[i + 1]);
      if (maxList.length < tmpList.length) {
        maxList.length = tmpList.length;
        maxList = tmpList;
      }
    } else {
      tmpList = [arr[i]];
    }
  }

  return maxList;
};
