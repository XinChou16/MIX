/**
 * 迭代指定的对象，返回新的对象
 * @param {Object} object 迭代的对象
 * @param {Function} iteratee 迭代器
 * @returns {Object} 返回处理后的对象
 * @example
 *
 * const lovers = {
 *   Evan: { like: 'Lily', age: 22 },
 *   Lily: { like: 'Evan', age: 20 }
 * };
 *
 * mapValue(lovers, ({ age }) => age);
 * // { Evan: 22, Lily: 20 }
 *
 *
 */
module.exports = function mapValue(object, iteratee) {
  object = Object(object);
  const result = {};

  Object.keys(object).forEach(key => {
    result[key] = iterate(object[key], key, object);
  });

  return result;
}
