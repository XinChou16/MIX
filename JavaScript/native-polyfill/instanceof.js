function instanceofPolyfill(left, right) {
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