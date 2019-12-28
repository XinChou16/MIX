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
    function addBase(id, uri) {
        // uri为当前地址，加上_use_12，判断Use次数
       var result = '';

        // 先固定 id 为 `a.js` 格式，暂不做兼容
        result = data.cwd + id;

        return result;
    }

    /**
     * startUp
     */
    // 生成绝对路径
    startUp.resolve = function(child, parent) {
        if (!child) return '';
        return addBase(child, parent);
    }

    startUp.request = function(uri,callback) {
        if (!uri) return;
        var s = document.createElement('script');
        s.src = uri;
        document.body.appendChild(s);
        s.onload = function() {
            callback();
        }

    }

    /**
     * Module 构造器
     */
    function Module(uri, deps) {
        this.uri = uri;
        this.deps = deps || [];
        this.status = 0;
        this._remain = 0;
        this._waitings = {};
    }

    Module.prototype.load = function() {
        var module = this;
        module.status = status.LOADING;

        // 获取主干上的依赖项
        var uris = module.resolve();
        var len = module._remain = uris.length;
        var m;

        for (var i = 0; i < len; i++) {
            // 创建 Uri缓存
            m = Module.get(uris[i]);
            if (m.STATUS < status.LOADED) {
                m._waitings[module.uri] = m._waitings[module.uri] || 1;
            } else {
                module._remain--;
            }
        }

        // 加载完成
        if (module._remain == 0) {
            module.onload();
        }

        for (var j = 0; j < len; j++) {
            m = Module.get(uris[j]);
            if (m.status < status.FETCHED) {
                m.fetch(requestCache);
            }
        }

        for (uri in requestCache) {
            requestCache[uri]();
        }

    };


    Module.prototype.fetch = function(requestCache) {
        var module = this;
        module.status = status.FETCHED;
        var uri = module.uri;
        requestCache[uri] = sendRequest;

        function sendRequest() {
            startUp.request(uri, onRequest);
        }

        
    }

    Module.prototype.resolve = function() {
        var module = this;
        var ids = module.deps;
        var uris = [];

        for (var i = 0; i < ids.length; i++) {
            uris[i] = startUp.resolve(ids[i], module.uri);
        }

        return uris;
    }

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
