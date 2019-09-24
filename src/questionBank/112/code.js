/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {

  if(!root) {
    return false;
  }

  const queue = [];
  queue.push({tmpSum: 0, node: root});

  while(queue.length > 0) {
    const element = queue.shift();
    const {tmpSum, node} = element;
    const newSum = tmpSum + node.val;
    if(!node.left && !node.right && newSum === sum) {
      return true;
    }
    if(node.left) {
      queue.push({tmpSum: newSum, node: node.left});
    }
    if(node.right) {
      queue.push({tmpSum: newSum, node: node.right});
    }
  }

  return false;
};