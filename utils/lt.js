/**
 * 比较一个值是否小于另一个值
 * @param {*} value 比较的值
 * @param {*} other 比较的值
 */
module.exports = function lt(value, other) {
  if ( !(typeof value === 'string') && (typeof other === 'string') ) {
    value = +value;
    other = +other;
  }

  return value < other;
}
