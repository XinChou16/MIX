/**
 * BinaryTreeNode
 */
const LEFT = Symbol('left');
const RIGHT = Symbol('right');

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.parentSide = null;
  }

  setLeft(node) {
    this.left = node;
    if (node) {
      node.parent = this;
      node.parentSide = LEFT;
    }
  }

  setRight(node) {
    this.right = node;
    if (node) {
      node.parent = this;
      node.parentSide = RIGHT;
    }
  }

  get parentChildSide() {
    if (this.parent) {
      return this.isParentLeftChild ? 'left' : 'right';
    }
  }

  get isParentLeftChild() {
    return this.parentSide === LEFT;
  }

  get isParentRightChild() {
    return this.parentSide = RIGHT;
  }

  get isLeaf() {
    return !this.left && !this.right;
  }

  get sibling() {
    const { parent } = this;
    if (!parent) return null;
    return parent.right === this ? parent.left : parent.right;
  }

  get uncle() {
    const { parent } = this;
    if (!parent) return null;
    return parent.sibling;
  }

  get grandParent() {
    const { parent } = this;
    return parent && parent.parent;
  }

  get leftSubTreeHeight() {
    return this.left ? this.left.height + 1 : 0;
  }

  get rightSubTreeHeight() {
    return this.right ? this.right.height + 1 : 0;
  }

  get height() {
    return Math.max(this.leftSubTreeHeight, this.rightSubTreeHeight);
  }
}

BinaryTreeNode.LEFT = LEFT;
BinaryTreeNode.RIGHT = RIGHT;

export default BinaryTreeNode;
