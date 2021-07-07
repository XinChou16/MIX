import applyMixin from './mixin.js';
import installModules from './register.js';

class Store {
  constructor(options = {}) {
    const { state } = options;

    this._mutations = Object.create(null);
    this._actions = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._subscribers = [];

    const store = this;
    const { commit, dispatch } = this;

    this.commit = function(type, payload) {
      return commit.call(store, type, payload);
    }

    this.dispatch = function(type, payload) {
      return dispatch.call(store, type, payload);
    }

    installModules(this, options);

    resetStoreVM(this, state);
  }

  get state() {
    return this._vm.state;
  }

  set state(val) {
    console.error('set %s fail, please use replaceState', val);
  }

  commit(type, payload) {
    const entry = this._mutations[type];

    if (!entry) {
      console.log(`===type===: ${type} not exist`);
      return;
    }

    const mutation = { type, payload };

    entry.forEach(function mutationIterator(handler) {
      console.log(`===exe commit===: ${type}, payload: ${payload}`);
      handler(payload);
    });

    // subscribers
    this._subscribers.forEach((handler) => handler(mutation, this.state));
  }

  dispatch(type, payload) {
    console.log({type, payload});
    const entry = this._actions[type];
    if (!entry) {
      console.warn('===type===', type, 'not exist');
      return;
    }

    return entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload);
  }

  subscribe(handler, options = {}) {
    const subs = this._subscribers;

    if (subs.indexOf(handler) < 0) {
      subs[options.prepend ? 'unshift' : 'push'](handler);
    }

    return () => {
      var index = subs.indexOf(handler);
      if (index > -1) {
        subs.splice(index, 1);
      }
    }
  }
}

function resetStoreVM(store, state) {
  // 外部访问的getters
  store.getters = {};

  // 响应式计算属性
  const computed = {};

  Object.keys(store._wrappedGetters).forEach(key => {
    const fn = store._wrappedGetters[key];

    // 这里不直接返回，包了一层，是给getters注入store对象
    // Vue实例中的computed,只能获取当前实例上的数据，无法获取store数据
    computed[key] = () => {
      return fn(store);
    };

    // 定义外部访问的getters设置对应的getter
    // 访问顺序：获取store.getters.foo时，顺序为：
    // store_vm[key] -> computed[key] -> wrappedGetter
    // 在这里做了层代理
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    });
  });

  store._vm = new Vue({
    data: { state },
    computed
  })

}

// install vuex plugin
var Vue;

function install(_Vue) {
  if (Vue) {
    console.error('[vuex] has installed already');
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install, Store };
