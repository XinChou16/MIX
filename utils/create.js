/**
 * 根据给定的原型创建对象
 * @param {Object} prototype 需要继承的对象
 * @param {Object} properties 需要拓展的属性
 */
module.exports = function create(prototype, properties) {
  prototype = prototype === null ? null : Object(prototype);
  var result = Object.create(prototype);
  return prototype == null ? result : Object.assign(result, properties);
}
