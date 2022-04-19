/**
 *
 */
class EventsEmitter {
  constructor() {
    this._events = Object.create(null);
  }
  $on(event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
  }
  $once(event, fn) {
    function on() {
      this.$off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
  }
  $off(event, fn) {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      return;
    }
    // specific event
    const cbs = this._events[event];
    if (arguments.length === 1) {
      this._events[event] = null;
      return;
    }
    // specific handler
    let cb,
      i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
  }
  $emit(event) {
    let cbs = this._events[event];
    const args = [].slice.call(arguments, 1);
    for (let i = 0, l = cbs.length; i < l; i++) {
      cbs[i].apply(this, args);
    }
  }
}
