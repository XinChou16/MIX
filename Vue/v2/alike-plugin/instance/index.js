/**
 * SDK Ctor
 */
import { warn } from '../util';
import { initMixin } from './init';
import { eventsMixin } from './events';

function SDK(options) {
  if (!(this instanceof SDK)) {
    warn('SDK is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(SDK);
eventsMixin(SDK);

export default SDK;
