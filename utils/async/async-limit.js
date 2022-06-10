/**
 * limit async request at same time
 * @see https://github.com/rxaviers/async-pool/blob/v1.3.0/lib/es7.js
 */
async function asyncLimit(concurrency, iterableData, iterator) {
    const ret = [];
    const executing = new Set();

    for (const data of iterableData) {
        const p = Promise.resolve().then(() => iterator(data));

        ret.push(p);
        executing.add(p);

        const clean = () => executing.delete(p);
        p.then(clean).catch(clean);

        if (executing.size >= concurrency) {
            await Promise.race(executing);
        }
    }

    return Promise.all(ret);
}

async function asyncPool(concurrency, iterableData, iterator) {
    let i = 0;
    const ret = [];
    const executing = new Set();

    const run = () => {
        if (i === iterableData.length) {
            return Promise.resolve();
        }

        const item = iterableData[i++];
        const p = Promise.resolve().then(() => iterator(item));
        const clean = () => executing.delete(p);

        ret.push(p);
        executing.add(p);

        p.then(clean).catch(clean);

        let r = Promise.resolve();
        if (executing.size >= concurrency) {
            r = Promise.race(executing);
        }

        return r.then(() => run());
    }

    return run().then(() => Promise.all(ret));
}


// test
const request = (url) => {
    console.log(`第 ${url} 个开始`, url)
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`第 ${url} 个任务完成`, Date.now());
            resolve(url);
        }, url*3);
    })
};
const timeout = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));
const list = [1000, 3000, 2000, 5000];

// let ret = asyncPooll(2, list, request);
