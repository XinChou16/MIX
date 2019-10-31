define(function(require) {
  // load modules with relative path
  var messages = require('./message');

  // load libirary/vendor modules using full IDs
  var print = require('print');

  print(messages.getHello())
  console.log('main loaded');
  
  return {
    msg: messages.getHello()
  };
});
