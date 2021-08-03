/**
 * Promise
 * https://github.com/taylorhakes/promise-polyfill/blob/master/src/index.js
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 */
var STATUS = ''; // pending fulfilled rejected

function Promise(fn) {
  console.log('new Promise');
  this._status = '';
  this._value = void 0;

  doResolve(fn, self);
}

function doResolve(fn, self) {
  try {
    fn(
      (value) => {
        self._value = value;
        resolve(self, value);
      },
      (reason) => {
        self._value = reason;
        reject(self, reason);
      }
    );
  } catch (error) {
    reject(self, error);
  }
}

function resolve(self, value) {
  try {
    self._status = 'fullfilled';
    self._value = value;
    finale(self);
  } catch (error) {
    reject(self, error);
  }
}
function reject(self, reason) {
  self._status = 'rejected';
  self._value = reason;
  finale(self);
}

function finale(self) {

}

Promise.prototype.then = (fn) => {
  fn(1);
};

export default Promise;
