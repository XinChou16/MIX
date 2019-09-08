import LinkedList from '../linked-list/LinkedList';

const DEFAULT_HASH_SIZE = 32;

export default class HashNode {
  constructor(hashSize = DEFAULT_HASH_SIZE) {
    // 哈希表，根据 size 进行创建，并填充链表
    this.buckets = 
      Array(hashSize)
      .fill(null)
      .map(() => new LinkedList());

    // 存储所有的 key 值
    this.keys = {};
  }

  hash(key) {
    const newkey = 
      Array.from(key)
      .reduce(
        (acc, cur) => (acc + cur.charCodeAt(0)),
        0
      );
    
    return newkey % this.buckets.length;
  }

  set(key, value) {
    const hashKey = this.hash(key);

    // 存储key
    this.keys[key] = hashKey;

    const bucketLinkedList = this.buckets[hashKey];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    if (!node) {
      bucketLinkedList.append({ key, value });
    } else {
      node.value.value = value;
    }
  }

  get(key) {
    // const hashKey = this.keys[key];
    const hashKey = this.hash[key];
    const bucketLinkedList = this.buckets[hashKey];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });
    
    return node ? node.value.value : undefined;
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }
}