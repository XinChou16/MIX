
function getArgs(args, startIndex) {
  var arr = []
  for(var i = startIndex; i < args.length; i++) {
      arr.push(args[i])
  }
  return arr
}
Function.prototype.call2 = function(ctx) {
  var args = getArgs(arguments, 1);

  ctx.fn = this;
  var result = eval('ctx.fn(' + args + ')');

  delete ctx.fn;

  return result;
}

/**
 * https://stackoverflow.com/questions/51503894/how-can-create-own-call-function-in-javascript
 * https://juejin.cn/post/6844903999791955982
 */
Function.prototype.call = function (ctx, ...args) {
  const fn = Symbol();
  ctx[fn] = this;

  try {
    const result =  ctx[fn](...args);
    delete ctx[fn];

    return result;
  } catch (e) { }

}

Function.prototype.apply = function (ctx, args) {
  return this.call(ctx, ...args);
}

Function.prototype.bind = function (ctx, ...args) {
  return (...args2) => this.call(ctx, ...args, ...args2);
}
