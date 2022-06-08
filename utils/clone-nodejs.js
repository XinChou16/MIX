const v8 = require('v8');

/**
 * native node clone
 * @param {*} obj 
 * @returns 
 * @see https://blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript/
 */
const structuredClone = obj => {
  return v8.deserialize(v8.serialize(obj));
};