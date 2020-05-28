(function (global, factory) {
  if (typeof module !== "undefined") {
    module.exports = factory();
  } else if (typeof define !== "undefined" && define.amd) {
    define("EventBus", factory);
  } else {
    global.EventBus = factory();
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
        }
        this.$busListeners = null;
      }
    })
  }

  return { install };
});
