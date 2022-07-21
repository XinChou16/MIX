const babel = require('@babel/core');
const path = require('path');

module.exports = function babelLoader(filename, raw) {
  const options = {
    presets: ['@babel/preset-env'],
    filename: path.basename(filename)
  }

  const { code } = babel.transform(raw, options);

  // 同步返回
  return code;
}
