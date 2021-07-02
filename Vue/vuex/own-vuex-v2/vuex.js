class Store {
  constructor(options = {}) {
    const { state } = options;

    this.state = state;
    this._mutations = Object.create(null);

    const store = this;
    const { commit } = this;

    this.commit = function(type, payload) {
      return commit.call(store, type, payload);
    }

    installModules(store, options);
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
}

function installModules(store, module) {
  const { mutations } = module;

  if (mutations) {
    Object.keys(mutations).forEach(function mutationIterator(type) {
      registerMutations(store, type, mutations[type]);
    });
  }
}

function registerMutations(store, type, handler) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrapperedMutationHandler(payload) {
      return handler(store.state, payload);
  });
}

let Vue;
function install(_Vue) {
  if (Vue) {
    console.error('vuex has installed already');
    return;
  }

  Vue = _Vue;
  applyMixin(Vue);
}

function applyMixin(Vue) {
  // vue 2.x version
  const version = Number(Vue.version.split('.')[0]);
  if (version === 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else if (version === 1) {
    const _init = Vue.prototype._init;
    Vue.prototype._init = function(options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    }
  }
}

function vuexInit() {
  const options = this.$options;
  if (options.store) {
    this.$store = options.store;
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store;
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install, Store };
