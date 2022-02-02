import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  constructor() {
    this.head = null;

    this.tail = null;
  }

  // add new node to a linkedList
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    // make instance called chain
    return this;
  }

  // add new node to the last of a linkedlist
  append(value) {
    const newTailNode = new LinkedListNode(value);
    this.tail = newTailNode;

    if (!this.head) {
      this.head = newTailNode;
      this.tail = newTailNode;
      return this;
    }

    this.tail.next = newTailNode;
    this.tail = newTailNode;
    return this;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deleteHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleteHead;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while(currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(next) {
    return this.toArray()
      .map(node => node.toString(next))
      .toString();
  }
}
