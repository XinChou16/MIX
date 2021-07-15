export default function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version === 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else if (version === 1) {
    var _init = Vue.prototype._init;
    Vue.prototype._init = function(options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    }
  }

  function vuexInit() {
    var options = this.$options;

    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}
