/**
 * EventEmitter
 * @see ../Vue/v2/principle/lib-vue2/instance/events.js
 * @see ../Vue/v2/vue-2.0.0/src/core/instance/events.js
 */
class EventEmitter {
    #event = {};
    
    on(name, cb) {
        let cbs = this.#event[name];
        if (!Array.isArray(cbs)) {
            this.#event[name] = cbs = [];
        }
        cbs.push(cb);

        return () => {
            this.off(name, cb);
        }
    }

    off(name, cb) {
        let cbs = this.#event[name];

        if (name) {
            if (cb) {
                let idx = cbs.indexOf(cb);
                idx = idx > -1 ? idx : cbs.indexOf(cb.cb);
                if (idx > -1 ) {
                    cbs.splice(idx, 1);
                }
            } else {
                delete this.#event[name];
            }
        } else {
            this.#event = {};
        }
    }

    once(name, cb) {
        function fn() {
            cb.apply(this, arguments);
            this.off(name, fn);
        }
        fn.cb = cb;
        this.on(name, fn);
    }

    emit(name, ...args) {
        let cbs = this.#event[name];

        if (Array.isArray(cbs)) {
            cbs.slice().forEach(cb => cb(...args));
        }
    }
}
