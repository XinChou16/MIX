/**
 * 迭代对象的键值
 * @param {object} object 对象
 * @param {function}} iterate 迭代方法
 */
module.exports = function mapKey(object, iterate) {
  object = Object(object);
  const result = {};

  Object.keys(object).forEach(key => {
    const val = object[key];
    result[iterate(value, key, object)] = val;
  });

  return result;
}
