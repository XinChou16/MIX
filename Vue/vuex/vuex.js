class Store {
  constructor(options = {}) {
    const { state } = options;
    this.options = options;

    this._mutations = Object.create(null);

    const { commit } = this;
    const store = this;

    this.commit = (type, payload) => {
      return commit.call(store, type, payload);
    };

    installModule(store, options);
  }

  get state() {
    return this.options.state;
  }

  // commit
  commit(type, payload) {
    const entry = this._mutations[type];

    if (!entry) {
      return;
    }

    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  }
}

function installModule(store, module) {
  const { mutations } = module;

  if (mutations) {
    Object.keys(mutations).forEach((key) => {
      registerMutation(store, key, mutations[key]);
    });
  }
}

function registerMutation(store, type, handler) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrapperedMutationHandler(payload) {
    return handler(store.state, payload);
  });
}


let Vue;
function install(_Vue) {
  if (Vue) {
    console.log('already installed');
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}

function applyMixin(Vue) {
  // vue 2.x version
  Vue.mixin({
    beforeCreate: vuexInit
  });
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

export default {
  Store,
  install
};
