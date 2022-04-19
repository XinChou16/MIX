/**
 * Vue
 */
class Vue {
  constructor(opts) {
    console.log('init', opts);

    this.$options = opts;

   initState(this);
  }
}

function initState(vm) {
  const opts = vm.$options;
  const data = vm._data =  vm.$options.data;

  // proxy data
  Object.keys(data).forEach(key => {
    proxy(vm, '_data', key);
  });

  // observe data
  observe(data);

  console.log('init data', data);
}

function proxy(obj, srcKey, key) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return this[srcKey][key];
    },
    set(val) {
      this[srcKey][key] = val;
    }
  });
}

function isPlainObj(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    // writable: true,
    // configurable: true,
    enumerable: false,
  });
}

function observe(value) {
  console.log('v- observe', value);

  let ob;

  if (hasOwn(value, '__ob__')) {
    ob = value.__ob__;
  } else if (Array.isArray(value) || isPlainObj(value)) {
    ob = new Observer(value);
  }

  return ob;
}

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = {};

    def(value, '__ob__', this);

    this.walk(value);
  }

  walk(obj) {
    let keys = Object.keys(obj);
    keys.forEach(key => {
      defineReactive(obj, key);
    })
  }
}

function defineReactive(obj, key) {
  console.log('reactive', obj, key);
}

export default Vue;
