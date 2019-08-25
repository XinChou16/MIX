import Comparator from '../utils/comparator/Comparator';

export default class Heap {
  constructor(compareFunction) {
    // use a array to mock heap
    this.heapContainer = [];
    this.compare = new Comparator(compareFunction);
  }

  /**
   * parent 1 childL 3 childR 4
   * 2n + 1
   */
  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }

  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }

  /**
   * childI 3 | 4 parent 1
   *  (n - 1) / 2
   */
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * [0, 1, 2, 3, 4]
   * parent 1 < 5 true
   * parent 3 < 5 false
   */
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  // top is -1
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  // get the first one
  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  remove(item, comparator = this.compare) {

  }

  find(item, comparator = this.compare) {
    const foundIndex = [];
    let index = 0;

    for(; index < this.heapContainer.length; index++) {
      if (comparator.equal(item, this.heapContainer[index])) {
        foundIndex.push(index);
      }
    }

    return foundIndex;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }

  heapifyUp(customStartIndex) {

  }

  heapifyDown(customStartIndex) {

  }

  checkIsInCorrectOrder(a, b) {

  }
}