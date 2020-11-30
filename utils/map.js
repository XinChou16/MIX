/**
 * 迭代对象
 * @param {object} object 迭代对象
 * @param {*} iterate 迭代器方法
 */
module.exports = function map(array, iteratee) {
  let index = -1;
  const len = Array.isArray(array) ? array.length : 0;
  const result = new Array(len);

  while(++index < len) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}
