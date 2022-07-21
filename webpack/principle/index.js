const Compiler = require('./lib/step/compiler-7');
const options = require('./webpack.config');
new Compiler(options).run();
