(function(global) {
    var startUp = (global.startUp = {
        version: '1.0.1'
    });
    var data = {};
    var cache = {};
    //模块的生命周期
    var status = {
        FETCHED: 1,
        SAVED: 2,
        LOADING: 3,
        LOADED: 4,
        EXECUTING: 5,
        EXECUTED: 6
    };

    function isArray(arr) {
        return Array.isArray(arr);
    }

    var _cid = 0;
    function cid() {
        return _cid++;
    }

    /**
     * Module 构造器
     */
    function Module(uri, deps) {
        this.uri = uri;
        this.deps = deps || [];
    }

    Module.prototype.load = function() {
        var module = this;
        module.status = status.LOADING;
    };

    Module.define = function(factory) {};

    Module.get = function(uri, deps) {
        return cache[uri] || (cache[uri] = new Module(uri, deps));
    };

    Module.use = function(deps, callback, uri) {
        var module = Module.get(uri, isArray(deps) ? deps : [deps]);
        console.log(module);

        module.callback = function() {
            callback();
        };

        module.load();
    };

    data.preload = [];
    data.cwd = document.URL.match(/[^?]*\//)[0];

    Module.preload = function(callback) {
        var len = data.preload.length;
        if (!len) callback();
    };

    startUp.use = function(list, callback) {
        Module.preload(function() {
            Module.use(list, callback, data.cwd + '_use_' + cid());
        });
    };

    global.define = Module.define;
})(this);
