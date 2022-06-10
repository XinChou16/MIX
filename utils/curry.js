/**
 * curry
 * @see https://zh.javascript.info/currying-partials
 */
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}

// test case
function sum(a, b, c) {
    return a + b + c;
}

const f1 = curry(sum);

let r;
r = f1(1, 2, 3);
r = f1(1)(2)(3)
r = f1(1, 2)(3);
r = f1(1)(2, 3)


