(function (graph) {
  function require(moduleId) {
    function localRequire(relativePath) {
      return require(graph[moduleId].dependencies[relativePath]);
    }

    // require参数是给 code 里面提供的，避免查找不到
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[moduleId].code);

    return exports;
  }

  require('./src/index.js');
})({
  './src/index.js': {
    dependencies: { './math': './src/math.js' },
    code: '"use strict";\n\nvar _math = require("./math");\n\n// import math from \'./math2\'\nvar ret = window.ret = (0, _math.add)(1, 2);\nconsole.log({\n  ret: ret\n});',
  },
  './src/math.js': {
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.add = add;\n\nfunction add(a, b) {\n  return a + b;\n}',
  },
});
