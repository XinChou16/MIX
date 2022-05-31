/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * 翻转二叉树
 * https://leetcode.cn/problems/invert-binary-tree/
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var invertTree = function(root) {
  if (!root) return root;

  const left = root.left;
  root.left = root.right;
  root.right = left;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};
