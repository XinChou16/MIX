'use strict'

const { checkPhone, getQueryParams, deepCopy } = require('../src/utils');
const { normalizeDate } = require('../src/date');

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
