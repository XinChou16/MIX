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

export default { install };
