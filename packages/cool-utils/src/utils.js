function checkPhone(phone) {
  return /^1(3|5|6|7|8|9)\d{9}$/.test(phone);
}

function getQueryParams(url) {
  const paramsArr = url.match(/([^?=&]+)(=([^&]*))/g);

  if (!paramsArr.length) return {};

  const paramsObj = paramsArr.reduce((obj, str) => {
    let [key, val = ''] = str.split('=');
    obj[key] = decodeURIComponent(val);
    return obj;
  }, {});
  return paramsObj;
}

function find (list, f) {
    return list.filter(f)[0]
}
function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

function repeat (str, times) {
    return (new Array(times + 1)).join(str);
}
  
function pad (num, maxLength) {
    // '0012'
    return repeat('0', maxLength - num.toString().length) + num;
}

exports.checkPhone = checkPhone;
exports.getQueryParams = getQueryParams;
exports.deepCopy = deepCopy;
