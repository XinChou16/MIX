/**
 * 处理日期格式
 * @param {any} date 日期数据
 */
export function normalizeDate(date) {
  if (!date) {
    return;
  }

  if (typeof date === 'number') {
    return new Date(date);
  } else if (typeof date === 'string') {
    return new Date( date.replace(/-/g, '/') );
  }
  else if (typeof date === 'object') {
    return date;
  }
}
