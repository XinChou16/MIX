
/**
 * @param obj The object to inspect.
 * @returns True if the argument appears to be a plain object.
 * @see https://github.com/reduxjs/redux/blob/master/src/utils/isPlainObject.ts
 */
 export default function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false
  
    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }
  
    return Object.getPrototypeOf(obj) === proto
  }