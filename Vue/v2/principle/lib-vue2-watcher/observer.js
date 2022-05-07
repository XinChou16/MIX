import Dep from './dep';

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

export function observe(value) {
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
