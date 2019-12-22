const fibonacciNth = require('./fibonacciNth');

describe('calc-right', () => {
    it('fibonacciNth-correctly', () => {
        expect(fibonacciNth(1)).toBe(1);
        expect(fibonacciNth(2)).toBe(1);
        expect(fibonacciNth(3)).toBe(2);
        expect(fibonacciNth(4)).toBe(3);
        expect(fibonacciNth(5)).toBe(5);
        expect(fibonacciNth(6)).toBe(8);
        expect(fibonacciNth(20)).toBe(6765);
        expect(fibonacciNth(50)).toBe(12586269025);
    });
});
