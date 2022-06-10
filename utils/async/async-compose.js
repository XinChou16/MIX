/**
 * async compose
 * async pipe
 */

function asyncCompose(...fns) {
    return input => {
        return fns.reduceRight(
            (chain, fn) => chain.then(fn),
            Promise.resolve(input)
        );
    }
}

function asyncPipe(...fns) {
    return input => {
        return fns.reduce(
            (chain, fn) => chain.then(fn),
            Promise.resolve(input)
        );
    }
}
