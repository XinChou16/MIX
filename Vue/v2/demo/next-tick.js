(function (global) {
  var defers = [],
    running = false,
    slice = [].slice;

  var timerFunc;

  if (typeof Promise !== 'undefined') {
    var resolved = Promise.resolve();
    timerFunc = function (fn) {
      resolved.then(fn);
    };
  } else {
    var originSetTimeout = global.setTimeout;
    timerFunc = function (fn) {
      originSetTimeout(fn, 0);
    };
  }

  function runDefers() {
    var cbs = defers.slice();
    defers.length = 0;
    running = false;

    for (var i = 0; i < cbs.length; i++) {
      var defer = cbs[i];
      var fn = defer[0];
      var ctx = defer[1];
      var args = slice.call(defer, 2);

      fn.apply(ctx, args);
    }
  }

  function nextTick(fn, context, args) {
    var defer = slice.call(arguments);
    defers.push(defer);

    if (!running) {
      running = true;
      timerFunc(runDefers);
    }

    return defers.length;
  }

  global.nextTick = nextTick;
})(this);
