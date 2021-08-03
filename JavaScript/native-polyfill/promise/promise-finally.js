if (!Promise.prototype.finally) {
    Promise.prototype.finally = function f(fn){
        return this.then(fn,fn);
    };
}
