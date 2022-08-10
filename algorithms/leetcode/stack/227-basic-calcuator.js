/**
 * 基本计算器
 */

// '203' -> 203
function str2Number(str) {
  let num = 0;
  let i = 0;

  while (i < str.length) {
    console.log(num, str[i]);
    num = num * 10 + str[i].charCodeAt() - '0'.charCodeAt();
    i++;
  }

  return num;
}

function calc(str) {
  str = str.trim();
  let stack = [];
  let i, len, item;
  let num = 0;
  let sign = '+'; // 初始定义为+，确保第一个字符能够添加进去

  for (i = 0, len = str.length; i < len + 1; i++) {
    item = str[i];

    if (item === ' ') continue;
    if (item >= 0 && item <= 9) {
      num = num * 10 + item.charCodeAt() - '0'.charCodeAt();
      continue;
    }

    if (sign === '+') {
      // 处理相加情形
      stack.push(num);
    }
    else if (sign === '-') {
      // 处理相减情形，取负值，就变成加法
      stack.push(-num);
    }
    else if (sign === '*') {
      // 处理相乘情形，取出栈顶元素，计算后，再添加进去
      stack.push(stack.pop() * num);
    }
     else if (sign === '/') {
      // 处理相除情形，取出栈顶元素，计算后，再添加进去
      stack.push(Math.trunc( stack.pop() / num));
    }

    sign = item;
    num = 0;
  }
  console.log(stack);
  return stack.reduce((acc, cur) => acc + cur, 0);
}

let input = '1+2+3';
input = '1*2+3';
input = '1*2-3';
input = '1*2*3';
input = '12+3';
input = '12+32';
input = '1+9-10+2*3+9/3';

console.log(calc(input));
