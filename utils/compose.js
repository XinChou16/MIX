/**
 * compose
 */
function compose(...fns) {
    return input => {
        return fns.reduceRight(
            (arg, fn) => fn(arg),
            input
        );
    }
}

/**
 * pipe
 */
function pipe(...fns) {
    return input => {
        return fns.reduce(
            (arg, fn) => fn(arg),
            input
        );
    }
}

// test
const add = (a) => a + 5;
const subtract = (a) => a - 2;
const multiply = (a) => a * 3;
const divide = (a) => a / 1;

const fns1 = [add, subtract, multiply, divide];
const fns2 = [multiply, add, subtract, divide];

let piped = pipe(...fns1);

let ret = piped(2);
console.log(ret)
