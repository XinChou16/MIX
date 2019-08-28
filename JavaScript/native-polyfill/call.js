
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