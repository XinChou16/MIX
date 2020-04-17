/**
 * store 方法封装
 * @param {Object} options 选项
 * @prop {Function} options.storage 类型
 * @prop {Boolean} options.assertStorage 是否执行存储断言方法，默认不执行
 */
function storeManager(options = {}) {
  const storage = options.storage || window.localStorage;

  function getState(key) {
    let value;

    try {
      value = storage.getItem(key);
      return typeof value !== "undefined" ? JSON.parse(value) : undefined;
    } catch (err) {}

    return undefined;
  }

  function setState(key, state) {
    return storage.setItem(key, JSON.stringify(state));
  }

  const assertStorage =
    options.assertStorage ||
    (() => {
      storage.setItem("@@", 1);
      storage.removeItem("@@");
    });

  assertStorage();

  return {
    get: getState,
    set: setState,
  };
}
