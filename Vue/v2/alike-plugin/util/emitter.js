/**
 * emitter
 */

export default function createEmitter() {
  const eventsMap = Object.create(null);

  function on(type, handler) {
    const events = eventsMap[type] || (eventsMap[type] = []);

    if (events.indexOf(handler) > -1) {
      return;
    }

    events.push(handler);
  }

  function once(type, handler) {
    function onCb() {
      off(type, onCb);
      handler.apply(null, arguments);
    }
    onCb.fn = handler;

    on(type, onCb);
  }

  function off(type, handler) {
    // all
    if (!arguments.length) {
      eventsMap = Object.create(null);
      return;
    }

    const cbs = eventsMap[type];
    if (!cbs) {
      return;
    }

    // specific event
    if (!handler) {
      eventsMap[type] = null;
      return;
    }

    // specific handler
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === handler || cb.fn === handler) {
        cbs.splice(i, 1);
        break;
      }
    }
  }

  function emit(type, payload) {
    const events = eventsMap[type] || (eventsMap[type] = []);

    events.forEach((cb) => cb(payload));
  }

  return {
    $on: on,
    $once: once,
    $off: off,
    $emit: emit,
  };
}
