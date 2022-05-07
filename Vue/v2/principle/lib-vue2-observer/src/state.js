import Dep from './dep';
import { observe } from './observer';
import Watcher from './watcher';

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

    defineComputed(vm, key, getter);
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
        watcher.depend();
      }
      console.log('computedGetter', watcher);
      return watcher.value;
    }
}

export function stateMixin(Vue) {
	Vue.prototype._init = function () {
		initState(this);
    initComputed(this);
	};
}
