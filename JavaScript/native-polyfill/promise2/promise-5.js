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
          // 没有传入thenCb方法，直接传给下一个then
          result = thenCb ? thenCb(result) : result;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.catchCbs.push((value) => {
        // 没有传入catch方法，直接透传至下一个
        if (!catchCb) {
          reject(value);
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
      (result) => {
        cb();
        return result;
      },
      (error) => {
        cb();
        throw error;
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }

  static all(promises) {
    const ret = [];
    let completedCount = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        let item = promises[i];
        item
          .then((value) => {
            ret[i] = value;
            completedCount++;
            if (completedCount === promises.length) {
              resolve(ret);
            }
          })
          .catch(reject);
      }
    });
  }

  static allSettled(promises) {
    const ret = [];
    let settledCount = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise
          .then((value) => {
            ret[i] = { status: STATUS.FULFILLED, value };
          })
          .catch((reason) => {
            ret[i] = { status: STATUS.REJECTED, reason };
          })
          .finally(() => {
            settledCount++;
            if (settledCount === promises.length) {
              resolve(ret);
            }
          });
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve).catch(reject);
      }
    });
  }

  static any(promises) {
    const errors = [];
    let rejectedCount = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve).catch(reason => {
          rejectedCount++;
          errors[i] = reason;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        })
      }
    });
  }

}

module.exports = MyPromise;
