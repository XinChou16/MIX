import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }
  
  // stack is empty when there isnt head 
  isEmpty() {
    return this.linkedList.head;
  }

  // return the head value or null
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linked.head.value;
  }

  push(value) {
    this.linkedList.prepend(value);
  }

  /**
   * 移除第一项
   * @returns {any} removedValue
   */
  pop() {
    const removedHead = this.linkedList.deleteHead();
    return removeHead ? removedHead.value : null;
  }

  /**
   * 转换为数组
   * @returns {any[]} the array type of head value
   */
  toArray() {
    return this.linkedList
      .toArray()
      .map(linkedListNode => linkedListNode.value);
  }

  /**
   * 
   * @param {object} next 
   * @return {string} the strign of stack
   */
  toString(next) {
    return this.linkedList.toString(next);
  }
}