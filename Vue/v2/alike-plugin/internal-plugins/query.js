/**
 * query plugin
 */

export default function queryPlugin(SDK, options = {}) {
  const injectKey = options.injectKey || '$query';
  SDK.prototype[injectKey] = createQuery(options);
}

function createQuery(options) {
  const queryer = {
    has() {},
    set() {},
    del() {},
    getAll() {}
  };

  return queryer;
}
