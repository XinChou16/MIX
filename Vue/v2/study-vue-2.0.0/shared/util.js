/* @flow */

/**
 * Convert a value to a string that is actually rendered.
 *
 * 转换为字符串
 */
export function _toString (val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 *
 * 转换为数字
 */
export function toNumber (val: string): number | string {
  const n = parseFloat(val, 10)
  return (n || n === 0) ? n : val
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 *
 * 返回一个可以获取是否是MAP对象内的函数，高阶方法
 */
export function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 *
 * 检查是否是内部组件标签名
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Remove an item from an array
 *
 * 从数组中移除一项
 */
export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 *
 * 检查当前对象上是否有当前key
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 *
 * 检检查是否是原始值
 */
export function isPrimitive (value: any): boolean {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 *
 * 创建缓存函数
 */
export function cached (fn: Function): Function {
  const cache = Object.create(null)
  return function cachedFn (str: string): any {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delmited string.
 *
 * 连字符转换为驼峰
 */
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 *
 * 驼峰转换为连字符
 */
const hyphenateRE = /([^-])([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
})

/**
 * Simple bind, faster than native
 *
 * 原生bind方法的实现
 */
export function bind (fn: Function, ctx: Object): Function {
  function boundFn (a) {
    const l: number = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 *
 * 转换类数组为真正的数组
 */
export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 *
 * 对象属性的简易混合
 */
export function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * 类对象的判定
 */
export function isObject (obj: mixed): boolean {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * 对象的判定
 */
const toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'
export function isPlainObject (obj: any): boolean {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 *
 * 数组转换成对象
 */
export function toObject (arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/**
 * Perform no operation.
 *
 * 空函数
 */
export function noop () {}

/**
 * Always return false.
 *
 * 否定函数
 */
export const no = () => false

/**
 * Generate a static keys string from compiler modules.
 */
export function genStaticKeys (modules: Array<ModuleOptions>): string {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * 检查两个值是否相等
 */
export function looseEqual (a: mixed, b: mixed): boolean {
  /* eslint-disable eqeqeq */
  return a == b || (
    isObject(a) && isObject(b)
      ? JSON.stringify(a) === JSON.stringify(b)
      : false
  )
  /* eslint-enable eqeqeq */
}

export function looseIndexOf (arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}
