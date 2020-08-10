/**
 * 获取指定范围内的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 处于最小和最大中间的值
 */
export default function random(min, max) {
  if (min > max || max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor( Math.random() * (max - min + 1) );
}
