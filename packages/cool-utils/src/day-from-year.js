/**
 * 获取指定日期距离当年的天数方法
 * @param {string[]} dates 日期数组
 * @returns {number[]} 天数数组
 */
module.exports = function getDateList(dates) {
  /** 获取距离当年第一天的天数 */
  const dayOfYear = function (date) {
      const millisecondsOfDay = 1000 * 60 * 60 * 24;
      const curYearDate = new Date(date.getFullYear(), 0, 0);
      return Math.floor((date - curYearDate) / millisecondsOfDay);
  };
  const dayOfYearList = dates.map(function (date) {
      return dayOfYear(new Date(date));
  });

  return dayOfYearList;
}
