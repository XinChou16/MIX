/**
 * @author zhoux
 * @since 20191021
 * @update 20220602
 * @description Chrome 74+
 * @see [URLSearchParams polyfill](https://github.com/ungap/url-search-params/blob/master/esm/index.js)
 */

class MyURLSearchParams {

    #searchParams = [];

    constructor(init) {
        if (typeof init === 'string') {
            this.#searchParams = init.split('&').map(kv => kv.split('='));
        } else {
            this.#searchParams = Object.entries(init);
        }
    }

    get(key) {
        const param = this.#searchParams.find(kv => kv[0] === key);
        return param && param[1];
    }

    set(key, value) {
        const param = this.#searchParams.find(kv => kv[0] === key);
        if (param) {
            param[1] = value;
        } else {
            this.append(key, value);
        }
    }

    has(key) {
        return this.#searchParams.some(kv => kv[0] === key);
    }

    append(key, value) {
        this.#searchParams.push([key, value])
    }
    
    toString() {
        return this.#searchParams.map(kv => kv.join('=')).join('&')
    }

    *[Symbol.iterator]() {
        yield* this.#searchParams;
    }
}

// 构造函数支持传入 URL 参数串
let searchParams = new MyURLSearchParams("foo=11&bar=22");

// 构造函数也支持传入一个包含参数键值对的对象
searchParams = new MyURLSearchParams({foo: "1", bar: "2"})

// 实例支持 get()、set()、has()、append() 四个方法
console.log(searchParams.get("foo")) // "1"
searchParams.set("foo", "10") 
console.log(searchParams.has("bar")) // true
searchParams.append("foo", "100") 

// 实例支持 toString() 方法
console.log(searchParams.toString()) // "foo=10&bar=2&foo=100"

// 实例支持 for-of 迭代
for(const [key, value] of searchParams) {
  console.log([key, value])
  // ["foo", "10"]
  // ["bar", "2"]
  // ["foo", "100"]
}

function iterator() {
    let items = [];
    let iterable = false;
    try { iterable = !!Symbol.iterator } catch (e) {}
    
    return iterable
        ? items[Symbol.iterator]()
        : {
            next() {
                let value = items.shift();
                return { done: val === void 0, value };
            }
        }
}