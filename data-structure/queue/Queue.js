import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  // add item to a queue
  enqueue(value) {
    this.linkedList.append(value);
  }

  // item removed from a queue
  dequeue() {
    const removedNode = this.linkedList.deleteHead();
    return removedNode ? removedNode.value : null;
  }

  toString(next) {
    return this.linkedList.toString(next);
  }
}