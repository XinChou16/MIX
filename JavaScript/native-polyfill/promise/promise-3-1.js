
function Promise(fn) {
  this._status = 0;
  this._value = void 0;
  this._deferreds = [];

  doResolve(fn, this);
}

function doResolve(fn, self) {
  try {
    fn(
      (value) => {
        resolve(self, value);
      },
      (reason) => {
        reject(self, reason)
      }
    );
  } catch (error) {
    reject(self, error);
  }
}

function resolve(self, value) {
  self._status = 1;
  self._value = value;
  finale(self);
}

function reject(self, reason) {
  self._status = 2;
  self._value = reason;
  finale(self);
}

function finale(self) {
  var len = self._deferreds.length;

  while(len--) {
    handle(self, self._deferreds[len]);
  }

  self._deferreds.length = 0;
}

function handle(self, deferred) {
  if (self._status === 0) {
    self._deferreds.push(deferred)
    return;
  }

  Promise._immediateFn(function() {
    var cb = self._status === 1 ? deferred.onFulfilled : deferred.onRejected;
    var ret;

    try {
      ret = cb(self._value);
    } catch (error) {
      reject(deferred.promise, error);
      return;
    }

    resolve(deferred.promise, ret);
  });

}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = onFulfilled;
  this.onRejected = onRejected;
  this.promise = promise;
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(() => {});

  handle(this, new Handler(onFulfilled, onRejected, prom));

  return prom;
}

Promise._immediateFn = function(fn) {
  setTimeout(fn, 0);
}

export default Promise;
