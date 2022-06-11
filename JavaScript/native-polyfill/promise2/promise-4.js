/**
 * implemenation of Promise
 */

const STATUS = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  PENDING: 'pending',
};

class MyPromise {
  status = STATUS.PENDING;
  value = null;
  thenCbs = [];
  catchCbs = [];
  onSuccessBind = this.onSuccess.bind(this);
  onFailBind = this.onFail.bind(this);

  constructor(cb) {
    try {
      cb(this.onSuccessBind, this.onFailBind);
    } catch (error) {
      this.onFailBind(error);
    }
  }

  onSuccess(value) {
    queueMicrotask(() => {
      if (this.status !== STATUS.PENDING) return;
      this.status = STATUS.FULFILLED;
      this.value = value;
      this.runCallbacks('onSuccess');
    });
  }

  onFail(reason) {
    if (this.status !== STATUS.PENDING) return;
    queueMicrotask(() => {
      this.status = STATUS.REJECTED;
      this.value = reason;
      this.runCallbacks('onFail');
    });
  }

  runCallbacks(from) {
    if (this.status === STATUS.FULFILLED) {
      this.thenCbs.forEach((cb) => {
        cb(this.value);
      });
      this.thenCbs.length = 0;
    }

    if (this.status === STATUS.REJECTED) {
      this.catchCbs.forEach((cb) => {
        cb(this.value);
      });
      this.catchCbs.length = 0;
    }
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.thenCbs.push((result) => {
        try {
          result = thenCb ? thenCb(result) : result;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.catchCbs.push((value) => {
        if (!catchCb) {
          resolve(value);
          return;
        }
        try {
          resolve(catchCb(value));
        } catch (error) {
          reject(error);
        }
      });
      this.runCallbacks('then');
    });
  }

  catch(cb) {
    return this.then(null, cb);
  }

  finally(cb) {
    return this.then(
      result => {
        cb();
        return result;
      },
      error => {
        cb();
        throw error;
      }
    )
  }
}

const DEFAULT_VALUE = 'defaultValue';
function promise({ value = DEFAULT_VALUE, fail = false } = {}) {
  return new MyPromise((resolve, reject) => {
    //   fail
    fail ? reject(value) : resolve(value);
  });
}

let ret = promise({ value: 'val-init', fail: false })
  .then(
    (val) => (console.log('then-resolved: %s', val), val + ' from-1'),
    (error) => (console.log('then-rejected: %s', error), error)
  )
  .then(
    (val) => (console.log('then-resolved2: %s', val), val + 'from-2'),
    (error) => (console.log('then-rejected2: %s', error), error)
  );

// ret.then((val) => {
//   console.log('12', val, ret);
// });

module.exports = MyPromise;
