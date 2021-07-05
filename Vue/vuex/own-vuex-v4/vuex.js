import applyMixin from './mixin.js';

class Store {
  constructor(options = {}) {
    const { state } = options;

    this._mutations = Object.create(null);
    this._actions = Object.create(null);
    this._wrappedGetters = Object.create(null);

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

    entry.forEach(function mutationIterator(handler) {
      console.log(`===exe commit===: ${type}, payload: ${payload}`);
      handler(payload);
    });
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

function installModules(store, module) {
  const { mutations, actions, getters } = module;

  if (mutations) {
    Object.keys(mutations).forEach(function mutationIterator(type) {
      registerMutations(store, type, mutations[type]);
    });
  }

  if (actions) {
    Object.keys(actions).forEach(function actionIterator(type) {
      registerActions(store, type, actions[type]);
    });
  }

  if (getters) {
    wrapGetters(store, getters);
  }
}

function registerMutations(store, type, handler) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrapperedMutationHandler(payload) {
      return handler(store.state, payload);
  });
}

function registerActions(store, type, handler) {
  const entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var result = handler({
      state: store.state,
      getters: store.getters,
      commit: store.commit,
      dispatch: store.dispatch
    }, payload);

    if (!isPromise(result)) {
      return Promise.resolve(result);
    }

    return result;
  });
}

function wrapGetters(store, moduleGetters) {
  Object.keys(moduleGetters).forEach(getterKey => {
    const rawGetter = moduleGetters[getterKey];

    store._wrappedGetters[getterKey] = function wrappedGetter(store) {
      return rawGetter(
        store.state,
        store.getters
      );
    }
  });
}

// utils
function isPromise(val) {
  return val && typeof val.then === 'function';
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
