function bind(fn, ctx) {
  return function(a) {
    var len = arguments.length;
    
    return len 
      ? len > 1
        ? fn.apply(ctx, arguments) 
        : fn.call(ctx, a)
      : fn.call(ctx);
  }
}