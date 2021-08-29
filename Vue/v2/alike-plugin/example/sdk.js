var V = (function () {
  'use strict';

  /**
   * global config
   */
  var config = {
    /**
     * if enable log or not
     */
    silent: false,

    /**
     * handler for internal error
     */
    errorHandler: null,

    /**
     * handler for internal warn
     */
    warnHandler: null
  };

  function log(msg) {
    console.log(msg);
  }

  function warn(msg) {
    if (config.warnHandler) {
      try {
        return config.warnHandler.call(null, msg);
      } catch (e) {

      }
    }
    console.warn(`[SDK WARN]: \n`, msg);
  }

  /**
   * SDK Ctor
   */

  function SDK(options) {
    if (!(this instanceof SDK)) {
      warn('SDK is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  initMixin(SDK);

  // methods
  function initMixin(SDK) {
    SDK.prototype._init = function (options) {

    };
  }

  /**
   * init SDK use static method
   */

  function initUse(SDK) {
    SDK.use = function (plugin) {
      const installedPlugins =
        this._installedPlugins || (this._installedPlugins = []);

      if (installedPlugins.indexOf(plugin) > -1) {
        return this;
      }

      const args = [].slice.call(arguments, 1);
      args.unshift(this);
      if (plugin && typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);

      return this;
    };
  }

  /**
   * init global api
   */

  function initGlobalAPI(SDK) {
    // expose config
    const configDef = {};
    configDef.get = () => config;

    Object.defineProperty(SDK, 'config', configDef);

    // expose util
    SDK.util = {
      log,
      warn
    };

    // options
    SDK.options = Object.create(null);

    // expose use
    initUse(SDK);
  }

  /**
   * query plugin
   */

  function queryPlugin(SDK, options = {}) {
    const injectKey = options.injectKey || '$query';
    SDK.prototype[injectKey] = createQuery();
  }

  function createQuery(options) {
    const queryer = {
      has() {},
      set() {},
      del() {},
      getAll() {}
    };

    return queryer;
  }

  /**
   * internal plugins
   */

  function initInternalPlugins(SDK) {
    SDK.use(queryPlugin);
  }

  /**
   * SDK 插件方法
   * https://github.dev/vuejs/vue/blob/dev/README.md
   */

  initGlobalAPI(SDK);

  initInternalPlugins(SDK);

  SDK.version = '1.0.0';

  return SDK;

}());
//# sourceMappingURL=sdk.js.map
