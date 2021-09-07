
let active;

function watchEffect(cb) {
  active = cb;
  active();
  active = null;
}

function ref(initVal) {
  let value = initVal;
  let dep = new Dep();

  return Object.defineProperty({}, 'value', {
    get() {
      dep.depend();
      return value;
    },
    set(newVal) {
      if (newVal !== value) {
        value = newVal;
        dep.notify();
      }
    }
  });
}

class Dep {
  deps = new Set();
  depend() {
    if (active) {
      this.deps.add(active);
    }
  }
  notify() {
    this.deps.forEach(dep => dep());
  }
}


// example
let x;
let y;

let f = num => num * 100 + 200;

x = ref(1);
watchEffect(() => {
  let r = f(x.value);
  console.log('r', r);
});
