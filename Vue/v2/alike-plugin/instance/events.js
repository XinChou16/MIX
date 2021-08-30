/**
 * events mixin
 */
import createEmitter from '../util/emitter';

export function eventsMixin(SDK) {
  const eventTypes = ['$on', '$once', '$off', '$emit'];

  Object.keys(eventTypes).forEach(eventType => {
    Object.defineProperty(SDK.prototype, eventType, {
      enumerable: true,
      value: createEmitter()[eventType]
    });
  })
}
