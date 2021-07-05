/*
 * 不带参数指令
 * v-tap=handler
 * or
 * 带参数指令
 * v-tap=handler($index,el,$event)
 *
 * !!!新增!!!
 * 把tapObj对象注册在原生event对象上
 * 	event.tapObj拥有6个值
 * 	pageX,pageY,clientX,clientY,distanceX,distanceY
 * 后面2个分别的手指可能移动的位置(以后可用于拓展手势)
 *
 * */
(function () {
  var vueTap = {};
  var isVue2 = false;

  /**                               公用方法开始                 **/
  function isPc() {
    var uaInfo = navigator.userAgent;
    var agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
    var flag = true;
    for (var i = 0; i < agents.length; i++) {
      if (uaInfo.indexOf(agents[i]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  function isTap(el) {
    if (isVue2 ? el.disabled : el.el.disabled) {
      return false;
    }
    var tapObj = el.tapObj;
    // console.log({
    //   time: el.time,
    //   x: Math.abs(tapObj.distanceX),
    //   y: Math.abs(tapObj.distanceY)
    // });
    return (
      el.time < 300 &&
      Math.abs(tapObj.distanceX) < 10 &&
      Math.abs(tapObj.distanceY) < 10
    );
  }

  function touchstart(e, el) {
    var touches = e.touches[0];
    var tapObj = el.tapObj;
    tapObj.pageX = touches.pageX;
    tapObj.pageY = touches.pageY;
    tapObj.clientX = touches.clientX;
    tapObj.clientY = touches.clientY;
    el.time = +new Date();
  }

  function touchend(e, el) {
    var touches = e.changedTouches[0];
    var tapObj = el.tapObj;
    el.time = +new Date() - el.time;
    tapObj.distanceX = tapObj.pageX - touches.pageX;
    tapObj.distanceY = tapObj.pageY - touches.pageY;

    if (!isTap(el)) return;
    el.handler(e);
  }

  var vue1 = {
    isFn: true,
    acceptStatement: true,
    update: function (fn) {
      var self = this;
      self.tapObj = {};
      if (
        typeof fn !== 'function' &&
        self.el.tagName.toLocaleLowerCase() !== 'a'
      ) {
        return console.error(
          'The param of directive "v-tap" must be a function!'
        );
      }

      self.handler = function (e) {
        //This directive.handler
        e.tapObj = self.tapObj;
        if (self.el.href && !self.modifiers.prevent) {
          return (window.location = self.el.href);
        }

        var tagName = e.target.tagName.toLocaleLowerCase();
        if (tagName === 'input' || tagName === 'textarea') {
          return e.target.focus();
        }

        fn.call(self, e);
      };
      if (isPc()) {
        self.el.addEventListener(
          'click',
          function (e) {
            if (self.el.href && !self.modifiers.prevent) {
              return (window.location = self.el.href);
            }
            self.handler.call(self, e);
          },
          false
        );
      } else {
        self.el.addEventListener(
          'touchstart',
          function (e) {
            if (self.modifiers.stop) e.stopPropagation();
            if (self.modifiers.prevent) e.preventDefault();
            touchstart(e, self);
          },
          false
        );
        self.el.addEventListener(
          'touchend',
          function (e) {
            try {
              Object.defineProperty(e, 'currentTarget', {
                // 重写currentTarget对象 与jq相同
                value: self.el,
                writable: true,
                enumerable: true,
                configurable: true,
              });
            } catch (e) {
              // ios 7下对 e.currentTarget 用defineProperty会报错。
              // 报“TypeError：Attempting to configurable attribute of unconfigurable property”错误
              // 在catch里重写
              console.error(e.message);
              e.currentTarget = self.el;
            }
            e.preventDefault();

            return touchend(e, self);
          },
          false
        );
      }
    },
  };

  // custom
  var vue2 = {
    bind: function (el, binding, vnode) {
      console.log('bind', binding);
      el.tapObj = {};

      el.handler = function (event, isPc) {
        var fn = binding.value;

        fn.call(this);
      };

      if (isPc()) {
        el.addEventListener('click', function (event) {
          el.handler(event, true);
        });
      } else {
        el.addEventListener(
          'touchstart',
          function (event) {
            touchstart(event, el);
          },
          false
        );

        el.addEventListener(
          'touchend',
          function (event) {
            return touchend(event, el);
          },
          false
        );
      }
    },
    componentUpdated: function (el, binding) {
      console.log('updated', binding);
      el.tapObj = {};
      el.handler = function (event, isPc) {
        //This directive.handler
        var fn = binding.value;

        fn.call(this);
      };
    },
    unbind: function(el) {
      console.log('unbind');
      el.handler = function() {};
    }
  };

  vueTap.install = function (Vue) {
    if (Vue.version.substr(0, 1) > 1) {
      isVue2 = true;
    }

    Vue.directive('tap', isVue2 ? vue2 : vue1);
  };
  vueTap.version = '3.0.3';

  if (typeof exports == 'object') {
    module.exports = vueTap;
  } else if (typeof define == 'function' && define.amd) {
    define([], function () {
      return vueTap;
    });
  } else if (window.Vue) {
    window.vueTap = vueTap;
    Vue.use(vueTap);
  }
})();
