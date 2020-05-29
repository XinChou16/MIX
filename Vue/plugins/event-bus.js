(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== "undefined") {
    module.exports = factory();
  } else if (typeof define !== "undefined" && define.amd) {
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
        this.$busListeners = {};

        for (let listener in $bus) {
          this.$busListeners[listener] = $bus[listener].bind(this);
          bus.$on(listener, this.$busListeners[listener]);
        }

      },
      beforeDestroy() {
        for (let listener in this.$busListeners) {
          bus.$off(listener, this.$busListeners[listener]);
          delete this.$busListeners[listener];
        }
        this.$busListeners = null;
      }
    })
  }

  return { install };
});
