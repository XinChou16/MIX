/**
 * eventListener
 */
export function useEventListener(...args) {
    let el, event, cb, options;

    // bind window if not provide el
    if (typeof args[0] === 'string') {
        [event, cb, options] = args;
        el = window;
    } else {
        [target, event, cb, options] = args;
    }

    el.addEventListener(event, cb, options);

    // teardown listener
    let unRegister = () => {
        el.removeEventListener(event, cb);
        unRegister = null;
    }
    this.$once('hook:beforeDestroy', unRegister);

    return unRegister;
}