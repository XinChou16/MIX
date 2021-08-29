/**
 * SDK Ctor
 */
import { warn } from '../util';

function SDK(options) {
  if (!(this instanceof SDK)) {
    warn('SDK is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(SDK);

// methods
function initMixin(SDK) {
  SDK.prototype._init = function (options) {

  };
}

export default SDK;
