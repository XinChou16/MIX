const Compiler = require('./lib/Compiler');
const options = require('./webpack.config');
new Compiler(options).run();
