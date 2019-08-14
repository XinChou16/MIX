import LinkedList from '../linked-list/LinkedList';

export default class HashNode {
  constructor(hashTableSize = 32) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());
    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key)
      .reduce(
        (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol).charCodeAt(0),
        0
      )
    return hash % this.buckets.length;
  }

  set() {

  }

  get() {
    const bucketLinkedList = this.buckets[this.hash[key]];
    const node = bucketLinkedList.find(
    { callback: nodeValue => nodeValue.key === key }
    );
    return node ? node.value.value : undefined;
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }
}