'use strict'

const { checkPhone, getQueryParams, deepCopy } = require('../src/utils');
const { normalizeDate } = require('../src/date');
const { getMaxSeriesArrLength, getMaxSeriesArr } = require('../src/arr-series');
const getDateList = require('../src/day-from-year');

describe('utils', () => {
    it('checkphone', () => {
        expect(checkPhone('122')).toEqual(false);
        expect(checkPhone('11566668888')).toEqual(false);
        expect(checkPhone('12566668888')).toEqual(false);
        expect(checkPhone('13566668888')).toEqual(true);
        expect(checkPhone('14566668888')).toEqual(false);
        expect(checkPhone('15566668888')).toEqual(true);
        expect(checkPhone('16566668888')).toEqual(true);
        expect(checkPhone('17566668888')).toEqual(true);
        expect(checkPhone('18566668888')).toEqual(true);
        expect(checkPhone('19566668888')).toEqual(true);
        expect(checkPhone('abc2566')).toEqual(false);
    });

    it('getQueryParams', () => {
        const params = {
            pcfrom: 'msgbox',
            type: 'comment',
        };
        const params2 = {
            ...params,
            name: '大力',
        };
        const params3 = {
            ...params2,
            age: '',
        };
        // '?pcfrom=msgbox&type=comment&name=%E5%A4%A7%E5%8A%9B&age='
        expect(getQueryParams('pcfrom=')).toEqual({ pcfrom: ''});
        expect(getQueryParams('pcfrom=msg')).toEqual({ pcfrom: 'msg' });
        expect(getQueryParams('?pcfrom=msg')).toEqual({ pcfrom: 'msg' });
        expect(getQueryParams('?pcfrom=msgbox&type=comment')).toEqual(params);
        expect(getQueryParams('?pcfrom=msgbox&type=comment&name=%E5%A4%A7%E5%8A%9B')).toEqual(params2);
        expect(getQueryParams('?pcfrom=msgbox&type=comment&name=%E5%A4%A7%E5%8A%9B&age=')).toEqual(params3);
    });

    it('deeepCopy: normal structure', () => {
        const original = {
            a: 1,
            b: 'string',
            c: true,
            d: null,
            e: undefined
        };
        expect(deepCopy(original)).toEqual(original);
    });

    it('deepCopy: nested structure', () => {
        const original = {
            a: {
              b: 1,
              c: [2, 3, {
                d: 4
              }]
            }
        };
        expect(deepCopy(original)).toEqual(original);
    });

    it('deepCopy: circular structure', () => {
        const original = {
            a: 1
        };
        original.circular = original;
        expect(deepCopy(original)).toEqual(original);
    });
});

describe('date', () => {
  const dateStr = '2021-03-16 09:00:00';
  const dateObj = new Date(dateStr);

  it('date: string', () => {
    expect(normalizeDate(dateStr)).toEqual(dateObj);
  });

  it('date: Safari', () => {
    const dateStr = '2021-03-16 09:00:00';
    const dateObj = new Date('2021/03/16 09:00:00');
    expect(normalizeDate(dateStr)).toEqual(dateObj);
  });

  it('date: Date instance', () => {
    expect(normalizeDate(dateObj)).toEqual(dateObj);
  });

});

describe('arr-series', () => {
  it('series: Get max len', () => {
    expect(getMaxSeriesArrLength([1, 2, 3])).toEqual(3);
    expect(getMaxSeriesArrLength([1, 2, 4])).toEqual(2);
    expect(getMaxSeriesArrLength([1, 2, 3, 4, 5])).toEqual(5);
    expect(getMaxSeriesArrLength([1, 1, 2, 4, 5])).toEqual(2);
    expect(getMaxSeriesArrLength([1, 1, 2, 3, 5])).toEqual(3);
    expect(getMaxSeriesArrLength([1, 1, 3, 3, 5])).toEqual(1);
    expect(getMaxSeriesArrLength([100])).toEqual(1);
  });
  it('series: Get max arr', () => {
    expect(getMaxSeriesArr([1, 2, 3])).toEqual([1, 2, 3]);
    expect(getMaxSeriesArr([1, 2, 4])).toEqual([1, 2]);
    expect(getMaxSeriesArr([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(getMaxSeriesArr([1, 1, 2, 4, 5])).toEqual([1, 2]);
    expect(getMaxSeriesArr([1, 1, 2, 3, 5])).toEqual([1, 2, 3]);
    expect(getMaxSeriesArr([1, 1, 3, 3, 5])).toEqual([1]);
    expect(getMaxSeriesArr([100])).toEqual([100]);
  });
});

describe('day-from-year-list', () => {
  const dates = [
    '2021-01-01',
    '2021-04-06',
    '2021-04-07',
    '2021-04-08',
    '2021-04-12',
  ];
  it('day: same month', () => {
    expect(getDateList(['2021-04-06'])).toEqual([96]);
    expect(getDateList(['2021-04-06', '2021-04-08'])).toEqual([96, 98]);
  });

  it('day: different month', () => {
    expect(getDateList(dates)).toEqual([1, 96, 97, 98, 102]);
    expect(getDateList(['2021-01-01'])).toEqual([1]);
  });
});
