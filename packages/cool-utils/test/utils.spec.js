'use strict'

const { checkPhone } = require('../src/utils');

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
})