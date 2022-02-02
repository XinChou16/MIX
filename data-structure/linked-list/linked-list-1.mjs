import Node from './node-1.mjs';

class LinkedList {
  constructor() {
    this.first = null;
  }
  /**
   * add head node
   */
  addFirst(value) {
    const node = new Node(value);
    node.next = this.first;
    this.first = node;
  }
  /**
   * append node
   */
  addLast(value) {
    const node = new Node(value);

    if (this.first) {
      let current = this.first;
      while (current && current.next) {
        console.log(current, value);
        current = current.next;
      }
      current.next = node;
    } else {
      this.first = node;
    }
  }
  /**
   * remove first node
   */
  removeFirst() {
    if (this.first) {
      this.first = this.first.next;
    }
  }
  /**
   * remove last node
   */
  removeLast() {
    let current = this.first;

    if (current && current.next) {
      while (current && current.next && current.next.next) {
        current = current.next;
      }
      current.next = null;
    }
  }
  /**
   * remove nth node by index
   */
  removeAt(nth) {
    if (nth === 0) {
      return this.removeFirst();
    }

    let index = 0;
    let current = this.first;

    if (current) {
      for (; current; index++) {
        if (index === nth && !current.next) {
          return this.removeLast();
        } else if (index === nth - 1 && current.next) {
          // index
          // current
          current.next = current.next.next;
          break;
        }
        current = current.next;
      }
    }
  }
  /**
   * contains
   */
  contains(value) {
    for (
      let current = this.first, index = 0;
      current;
      index++, current = current.next
    ) {
      if (current.value === value) {
        return index;
      }
    }
  }
}

var l1 = new LinkedList();

l1.addLast(12);
l1.addLast(13);
l1.addLast(14);
l1.addLast(15);
// l1.removeFirst();
// l1.removeLast();
// l1.removeAt(3);
// console.log(l1.contains(15));
// console.log(JSON.stringify(l1.first, null, 4));

export default LinkedList;
