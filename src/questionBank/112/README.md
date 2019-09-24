---
title: 112. 路径总和
difficulty: 简单
related: 二叉树|广度优先搜索
---

## 题目

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

## 示例

**输入：** 给定如下二叉树，以及目标和`sum = 22`

```json
      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
```

**输出：** true

**解释：**  因为存在目标和为`22`的根节点到叶子节点的路径`5->4->11->2`。

## 解析

本题是一道`二叉树`相关的题目，要判断`是否存在根节点到叶子节点的一条路径`，乍一想可以用`深搜`递归的方法来解决。

不过用`广搜`会更快，从根节点出发一层一层往下直到叶子结点，碰到叶子结点时判断当前路径和是否与目标值匹配即可。这样尝试的次数会比`深搜`更少，不过代价就是会额外用到一个队列，在空间上有所牺牲。

## 代码

```js
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
```