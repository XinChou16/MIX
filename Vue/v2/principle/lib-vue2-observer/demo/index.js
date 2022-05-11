let uid$1 = 0;

class Dep {
	constructor() {
    this.id = uid$1++;
		this.subs = [];
	}
	addSub(sub) {
		this.subs.push(sub);
	}
	removeSub(sub) {
		const idx = this.subs.indexOf(sub);
		if (idx > -1) {
			this.subs.splice(idx, 1);
		}
	}
  // 添加订阅者，访问了this.xx
	depend() {
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	}
  // 通知订阅者更新, this.xx 数据更新了
	notify() {
		const subs = this.subs.slice();
		for (let i = 0; i < subs.length; i++) {
			subs[i].update();
		}
	}
}

Dep.target = null;

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
		this.dep = new Dep(); // 第一个dep

		def(value, '__ob__', this);

		this.walk(value);
	}

	walk(obj) {
		let keys = Object.keys(obj);
		keys.forEach((key) => {
			defineReactive(obj, key);
		});
	}
}

function defineReactive(obj, key, val) {
	console.log('reactive', obj, key);
	val = val || obj[key];

	const dep = new Dep();

	Object.defineProperty(obj, key, {
		configurable: true,
		enumerable: true,
		get() {
			console.log('get', { key, val });
      // 添加依赖追踪 watcher
      // computed 初始时的，如果有依赖了其他变量，读取
      // 这个变量时会执行
			if (Dep.target) {
				dep.depend();
			}
			return val;
		},
		set(newVal) {
			console.log('set', { key, val, newVal });
			if (newVal === val) {
				return;
			}
			val = newVal;

			dep.notify();
		},
	});
}

let uid = 0;

class Watcher {
  constructor(vm, getter, cb, opts) {
    this.vm = vm;
    this.id = ++uid;
    this.deps = [];
    this.depIds = new Set();

    // debug info
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

function noop() {}

function initState(vm) {
	const data = (vm._data = vm.$options.data);

	// proxy data
	Object.keys(data).forEach((key) => {
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
		get: function proxyGetter() {
			return this[srcKey][key];
		},
		set: function proxySetter(val) {
			this[srcKey][key] = val;
		},
	});
}

function initComputed(vm) {
  const computed = vm.$options.computed;
  const watchers = vm._computedWatchers = Object.create(null);

  for (let key in computed) {
    const getter = computed[key];

    watchers[key] = new Watcher(
      vm,
      getter,
      noop,
      { key, type: 'computed' }
    );

    defineComputed(vm, key);
  }
  // console.log('watchers', vm._computedWatchers===watchers);
}

function defineComputed(vm, key, getter) {
  console.log('defineComputed', key);
  const def = {
    enumerable: true,
    configurable: true,
    get: makeComputedGetter(vm, key)
  };

  Object.defineProperty(vm, key, def);
}

function makeComputedGetter(vm, key) {
  return function computedGetter() {
      const watcher = vm._computedWatchers[key];
      // 添加当前依赖
      if (Dep.target) {
        // watcher.depend();
        console.log('==computed getter');
      }
      console.log('computedGetter', watcher);
      return watcher.value;
    }
}

function stateMixin(Vue) {
	Vue.prototype._init = function () {
		initState(this);
    initComputed(this);
	};
}

/**
 * Vue
 */
class Vue {
	constructor(opts) {
		console.log('init opts', opts);

		this.$options = opts;
    this._init();
	}
}

stateMixin(Vue);

export { Vue as default };
