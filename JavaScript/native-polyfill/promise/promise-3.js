/**
 * Promise
 * https://github.com/taylorhakes/promise-polyfill/blob/master/src/index.js
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 * DIFF:
 * 1. add handle 方法
 */
var STATUS = ''; // pending fulfilled rejected
var noop = function () {}

function Promise(fn) {
  console.log('new Promise');
  this._status = 0;
  this._value = void 0;
  this._deferreds = [];

  doResolve(fn, this);
}

function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      (value) => {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      (reason) => {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (error) {
    if (done) return;
    done = true;
    reject(self, error);
  }
}

function resolve(self, value) {
  try {
    self._status = 1;
    self._value = value;
    finale(self);
  } catch (error) {
    reject(self, error);
  }
}

function reject(self, reason) {
  self._status = 2;
  self._value = reason;
  finale(self);
}

function finale(self) {
  // 执行所有保存的onFullfilled函数
  var len = self._deferreds.length;
  while(len--) {
    handle(self, self._deferreds[len]);
  }
  self._deferreds = null;
}

function Handler(onFullfilled, onRejected, promise) {
  this.onFullfilled = onFullfilled;
  this.onRejected = onRejected;
  this.promise = promise;
}

function handle(self, deferred) {
  // 没有存储过，则进行保存
  if (self._status === 0) {
    self._deferreds.push(deferred);
    return;
  }

  Promise._immediateFn(() => {
    var cb = self._status === 1 ? deferred.onFullfilled : deferred.onRejected;
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

Promise.prototype.then = function (onFullfilled, onRejected){
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFullfilled, onRejected, prom));

  return prom;
};

Promise.prototype.finally = function(callback) {
  const p = this.constructor;
  return this.then(
    value => p.resolve(callback()).then(() => value),
    reason => p.resolve(callback()).then(() => p.reject(reason))
  );
}

Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function (fn) {
      setImmediate(fn);
    }) ||
  function (fn) {
    setTimeout(fn, 0);
  };

export default Promise;
