/**
 * JSON.stringify 方法
 *
 * https://gist.github.com/rajatjain-21/02e2c5a30cf9d0190cb5503a25417fd1
 * https://gist.github.com/crates/904e45ea8f42a5522115488c6ea51bd7
 */

 function stringify(data) {
  if (data === undefined) {
      return undefined;
  }
  if (data === null) {
      return 'null';
  }
  if (data.constructor === String) {
      return '"' + data.replace(/"/g, '\\"') + '"';
  }
  if (data.constructor === Number) {
      return String(data);
  }
  if (data.constructor === Boolean) {
      return data ? 'true' : 'false';
  }
  if (data instanceof Array) {
      return '[' + data.reduce((acc, item) => {
          if (item === undefined || item === null || item === NaN) {
              return [...acc, 'null'];
          }
          return [...acc, stringify(item)];
      }, []).join(',') + ']';
  }
  if (data.constructor === Object) {
      return '{' + Object.keys(data).map(key => {
          if (data[key] === undefined || data[key] === null) {
              return 'null';
          }
          return '"' + key + '":' + stringify(data[key]);
      }).join(',') + '}';
  }

  return '{}';
}

// test
let obj = {
  a: 1,
  b: new Set([1,2]),
  arr: [null,undefined,3,{a:1}]
}
obj2 = {
  num: 1,
  str: 'string',
  bool: true,
  null: null,
  undef: undefined,
  obj: { name: 1 },
  arr: ['r', null, 'g', 'b']
}

obj = [1,false,'foo',null];
obj = {a:1,b:'f',c:false}
console.log( JSON.stringify(obj) );
console.log( stringify(obj) );
console.log(stringify(obj) === JSON.stringify(obj));
