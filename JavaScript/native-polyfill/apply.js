
function getArgs(args, startIndex) {
  var arr = [];
  for(var i = startIndex; i < args.length; i++) {
      arr.push(args[i]);
  }
  return arr;
}
Function.prototype.apply2 = function(ctx, arr) {
  var args = getArgs(arr, 0);

  ctx.fn = this;
  var result;

  if (!arr) {
    result = ctx.fn();
  } else {
    result = eval('ctx.fn(' + args + ')');
  }

  delete ctx.fn;

  return result;
}