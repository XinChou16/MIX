(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.EventBus = factory();
    if (typeof global !== 'undefined' && global.Vue) {
      global.Vue.use(global.EventBus);
    }
  }
})(this, function () {
  function install(Vue) {
    const bus = new Vue();

    Vue.prototype.$bus = bus;

    Vue.mixin({
      created() {
        const $bus = this.$options.$bus || {};
        let $busListeners = {};

        for (let listener in $bus) {
          $busListeners[listener] = $bus[listener].bind(this);
          bus.$on(listener, $busListeners[listener]);
        }

        // tear down listeners
        this.$once('hook:beforeDestroy', () => {
          for (let listener in $busListeners) {
            bus.$off(listener, $busListeners[listener]);
            delete $busListeners[listener];
          }
          $busListeners = null;
        });

      }
    })
  }

  return { install };
});
