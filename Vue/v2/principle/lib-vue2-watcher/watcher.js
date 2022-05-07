import Dep from "./dep";

let uid = 0;

class Watcher {
  constructor(vm, getter, cb) {
    // vm._watchers = this;
    this.vm = vm;
    this.cb = cb;
    this.id = ++uid;
    this.deps = [];
    this.depIds = new Set();

    if (typeof getter === 'function') {
      this.getter = getter;
      this.setter = null;
    } else {
      this.getter = () => vm[getter];
      this.setter = (vm, value) => {
        // vm[key] = value;
        console.log('watcher setter', value);
      }
    }


    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  set(value) {
    return this.setter.call(this.vm, this.vm, value);
  }

  update() {
    return this.run();
  }

  run() {
    const value = this.get();
    const oldValue = this.value;

    if (value !== oldValue) {
      this.value = value;
      this.cb && this.cb.call(this.vm, value, oldValue);
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
