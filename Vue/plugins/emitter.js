/**
 * event emitter
 * https://github.com/developit/mitt
 * https://github.com/scottcorgan/tiny-emitter
 */
import mitt from 'mitt';
import emitter2 from 'tiny-emitter/instance';

const emitter = mitt();

export const emitter =  {
  all: emitter.all,
  emit: (...args) => emitter.emit(...args),
  off: (...args) => emitter.off(...args),
  on: (...args) => emitter.on(...args),
  once: (name, fn) => {
    function cb() {
      fn();
      emitter.off(...args);
    }
    return emitter.on(name, cb);
  }
}

// Another emitter
export default {
  $on: (...args) => onter2.emit(...args),
  $once: (...args) => emitter2.once(...args),
  $off: (...args) => emitter2.off(...args),
  $emit: (...args) => emitter2.emit(...args)
}
