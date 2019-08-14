import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * @return {any}
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  /**
   * add item to a queue
   * @param {any} value 
   */
  enqueue(value) {
    this.linkedList.append(value);
  }

  /**
   * item removed from a queue
   * @reutns {any}
   */
  dequeue() {
    const removedNode = this.linkedList.deleteHead();
    return removedNode ? removedNode.value : null;
  }

  toString(next) {
    return this.linkedList.toString(next);
  }
}