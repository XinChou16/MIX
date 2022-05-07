import Dep from "./dep";

let uid = 0;

class Watcher {
  constructor(vm, getter, cb, opts) {
    this.vm = vm;
    this.id = ++uid;
    this.deps = [];
    this.depIds = new Set();
    this.bindKey = opts.key;
    this.watchType = opts.type;

    if (typeof getter === 'function') {
      this.getter = getter;
    }

    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  update() {
    return this.run();
  }

  run() {
    const value = this.get();
    const oldValue = this.value;

    if (value !== oldValue) {
      this.value = value;
    }
  }

  addDep(dep) {
    if (!this.depIds.has(dep.id)) {
      this.deps.push(dep);
      this.depIds.add(dep.id);
      dep.addSub(this);
    }
  }
}

export default Watcher;
