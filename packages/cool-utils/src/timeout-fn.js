/**
 * timeout fn
 * @param {Function} cb callback
 * @param {Number} interval duration
 * @param {any} options options
 * @returns 
 */
function useTimeoutFn(cb, interval, options = {}) {
    const { immediate = true } = options;

    let timer;
    let pending = false;

    function clear() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function stop() {
        pending = false;
        clear();
    }

    function start(...args) {
        clear();

        pending = true;
        timer = setTimeout(() => {
            cb(...args);
            pending = false;
            timer = null;
        }, interval);
    }

    if (immediate) {
        pending = true;
        start();
    }

    return {
        ready: !pending,
        pending,
        start,
        stop
    };
}

const fn = () => console.log('after 3s')
const { start, stop } = useTimeoutFn(fn, 3000, { immediate: true });
