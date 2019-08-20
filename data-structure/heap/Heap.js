import Comparator from '../utils/comparator/Comparator';

export default class Heap {
  constructor(compareFunction) {
    this.heapContainer = [];
    this.compare = new Comparator(compareFunction);
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  heapifyUp(customStartIndex) {

  }

  hasParent() {
    return this.getParentIndex(childIndex) >= 0;
  }

  getParentIndex(childIndex) {
    // len = 9; 8 / 4 = 2;
    // len = 1; 0 / 2 = 0;
    // len = 2; 1 / 2 = 0;
    return Math.floor((childIndex - 1) / 2);
  }

  // get parent item
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }
}