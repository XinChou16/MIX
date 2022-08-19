/**
 * 当有任务执行完毕后，自动补充任务，始终保持正在执行的任务有 `concurrency`个
 *
 * @param {Function[]} tasks 返回值为promise对象的函数数组
 * @param {number} concurrency 大于0的整数
 * @return { resolved: number; rejected: number; } 返回resolved的任务数量、rejected的任务数量
 */
function parallel(tasks, concurrency) {
    const ret = {
        resolved: 0,
        rejected: 0
    };
    const pendingTasks = new Set();
    let index = 0;

    const run = () => {
        if (index >= tasks.length) {
            return Promise.resolve();
        } else {
            let p = Promise.resolve().then(() => tasks[index++]());
            const clear = () => pendingTasks.delete(p);

            pendingTasks.push(p);
            p.then(
                () => ret.resolved++,
                () => ret.rejected++
            ).finally(clear);

            const ret = pendingTasks.size() === concurrency
                ? Promise.race(pendingTasks)
                : Promise.resolve();

            return ret.then(() => run());
        }
    }

    return run().then(() => ret);
}
