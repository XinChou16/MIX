import './transfer';

let a: number = 10;

const b: string = '12';

/* Interface */
interface Name {
  first: string;
  age?: number,
  sex: number
}

let nameMe: Name = {
  first: 'Xin',
  // age: 18,
  sex: 0
};

/* 泛型 */
function reverse<T>(list: T[]): T[] {
    let result: T[] = [];
    return list.reverse();
}

let result = reverse([1, 2, 3]);

let list: number[] = [];

/* 拓展 */

interface Point {
  x: number
  y: number
}

declare const myPoint: Point

interface Point {
  z: number
}

myPoint.z = 1;


/* 枚举 */

enum Color {
  Red = 1,
  Green,
  Blue
}

let color = Color.Red;

// 字符串类型
enum Action {
  SET_DATE = 'SET_DATE',
  SET_SECONDS = 'SET_SECONDS'
}

let action = Action.SET_DATE;

const foo = 123;
const bar = foo.toString();

// window.helloWorld


/* 函数注解 */
interface Foo {
  foo: string
}
function foo1(data: Foo): Foo {
  let data1 = 123;
  return data;
}

/* ?.  */
let obj = {
  a: 1,
  b: {
    c:2
  }
}

let objc1 = obj.a;
let objc = obj?.a;
let objb = obj?.b?.c;
let objb2 = obj?.b!.c;

class myClass {
  constructor() {
    // this.name = '';
  }
  sayName() {};
}
