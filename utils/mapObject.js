/**
 * 迭代指定的对象（顺序不保证一致）
 * @param {object} object 需要迭代的对象
 * @param {function} iteratee 迭代器方法
 * @return {array} 迭代后的结果
 */
module.exports = function mapObject(object, iteratee) {
  const props = Object.keys(object);
  const result = new Array(props.length);

  props.forEach(function(key, index) {
    result[index] = iterate(object[key], key, object);
  });

  return result;
}
