const event = {
  on(element, type, listener, options) {
    element.addEventListener(type, listener, options);
    return () => event.off(element, type, listener, options);
  },
  off(element, type, listener, options) {
    element.removeEventListener(type, listener, options);
  },
  once(element, type, listener) {
    const handler = (...args) => {
      listener.apply(this, args);
      event.off(element, type, handler);
    }
    event.on(element, type, handler);
  }
}

export default event;
