---
title: 62. 不同路径
difficulty: 中等
related: 数组|动态规划
---

## 题目

一个机器人位于一个`m`x`n`网格的左上角（起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

![示例图](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/robot_maze.png)

例如，上图是一个7 x 3 的网格。有多少可能的路径？

说明：m 和 n 的值均不超过 100。

## 示例1

**输入：** m = 3, n = 2

**输出：** 3

**解释：** 从左上角开始，总共有 3 条路径可以到达右下角。

1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右

## 示例2

**输入：** m = 7, n = 3

**输出：** 28

## 解析

这是一个比较简单的动态规划问题（其实也可以看做是一个递归问题）。

对于解`f(m, n)`这个问题，由于要到达某一个点，只有从该点的上方和左方过来，所以我们可以将其转化为求解`f(m - 1, n)` + `f(m, n - 1)`的问题。

注意：初始化第一行和第一列的值为1。

## 代码

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  const dp = [];
  for(let i = 0; i < n; i++) {
    dp[i] = [1];
  }
  for(let i = 0; i < m; i++) {
    dp[0][i] = 1;
  }
  for(let i = 1; i < n; i++) {
    for(let j = 1; j < m; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[n - 1][m - 1];
};

// for test
[
  [3, 2],
  [7, 3]
].forEach(([m, n]) => {
  console.log(uniquePaths(m, n));
});
```