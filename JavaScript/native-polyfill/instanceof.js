function instanceofFunc1(left, right) {
  // 获得类型的原型
  let proto = right.prototype;

  // 获得对象的原型
  left = left.__proto__;

  // 判断对象的原型是否等于指定类型的原型
  while(true) {
    if (left === null) {
      return false;
    }

    if (proto === left) {
      return true;
    }

    left = left.__proto__;
  }
}

function instanceofFunc(left, right) {
  let proto = right.prototype;

  while(left) {
    left = left.__proto__;
    if (left === proto) {
      return true;
    }
  }

  return false;
}
