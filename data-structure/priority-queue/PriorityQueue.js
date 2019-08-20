import MinHeap from '../heap/MinHeap';
import Comparator from '../utils/comparator/Comparator';

export default class PriorityQueue extends MinHeap {
  constructor() {
    super();

    // 初始化 priority map
    this.priorities = new Map();

    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * add item to a priority queue
   * @param {*} item 
   * @param {*} priority 
   */
  add(item, priority = 0) {
    super.add(item);
    this.priorities.set(item, priority);
    return this;
  }

  remove(item, customFindingComparator) {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);
    return this;
  }

  // find item by its value
  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue));
  }

  hasValue(item) {
    return this.findByValue(item).length > 0;
  }

  changePriority(item, priority) {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);
    return this;
  }

  // compare priority of two items
  comparePriority(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }

    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  /**
   * 比较两个数
   * @param {*} a 
   * @param {*} b 
   */
  compareValue(a, b) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

}



