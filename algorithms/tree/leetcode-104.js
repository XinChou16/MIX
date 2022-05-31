/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 *
 * 104. 二叉树的最大深度
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 */

 function maxDepth(root) {
  if (root == null) {
      return 0;
  }

  const queue = [root];
  let depth = 0, size = 0, node;

  while(queue.length) {
      // 用size来表示该层处理完毕
      size = queue.length;
      while(size) {
          node = queue.shift();
          if (node.left) {
              queue.push(node.left);
          }
          if (node.right) {
              queue.push(node.right);
          }
          size--;
      }
      depth++;
  }

  return depth;
};

// function maxDepth(root: TreeNode | null): number {
//     if (root == null) {
//         return 0;
//     }

//     const depthLeft = maxDepth(root.left);
//     const depthRight = maxDepth(root.right);

//     return Math.max(depthLeft, depthRight) + 1;
// };
/**

// Math.max(0, 0) + 1 = 1;
3

// Math.max(1, 1) + 1 = 2
3 - 9 - 20

// Math.max(1, 2) + 1 = 3;
3 - 9 - 20 - null - null - 15 - 7


*/
