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
      this.status = STATUS.FULFILLED;
      this.value = value;
      this.runCallbacks();
    });
  }

  onFail(reason) {
    queueMicrotask(() => {
      this.status = STATUS.REJECTED;
      this.value = reason;
      this.runCallbacks();
    });
  }

  runCallbacks() {
    if (this.status === STATUS.FULFILLED) {
      this.thenCbs.forEach((cb) => {
        cb(this.value);
      });
    }

    if (this.status === STATUS.REJECTED) {
      this.catchCbs.forEach((cb) => {
        cb(this.value);
      });
    }
  }

  then(thenCb, catchCb) {
    thenCb && this.thenCbs.push(thenCb);
    catchCb && this.catchCbs.push(catchCb);
  }
}

const DEFAULT_VALUE = 'defaultValue';
function promise({ value = DEFAULT_VALUE, fail = false } = {}) {
  return new MyPromise((resolve, reject) => {
    //   fail
    fail ? reject(value) : resolve(value);
  });
}

let ret = promise({ value: 'val from instance', fail: false }).then(
  (val) => console.log('then-resolved: %s', val),
  (error) => console.log('then-rejected: %s', error)
);
// ret
