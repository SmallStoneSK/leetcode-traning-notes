---
title: 64. 最小路径和
difficulty: 中等
related: 数组|动态规划
---

## 题目

给定一个包含非负整数的`m`x`n`网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：** 每次只能向下或者向右移动一步。

## 示例

**输入：** 

```json
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
```

**输出：** 7

**解释：** 因为路径`1→3→1→1→1`的总和最小。

## 解析

这是一道比较基础的`动态规划`题，关键还是初始化`dp`数组以及找到状态转移方程。

1. 初始化过程很简单，分别计算首行/首列的路径和即可。
2. 状态转移方程也很简单，比较左边元素和上方元素大小即可，即：`dp[i][j]` = min(`dp[i - 1][j]`, `dp[i][j - 1]`) + `grid[i][j]`。

## 代码

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {

  const m = grid.length;
  const n = grid[0].length;

  const dp = [[grid[0][0]]];
  for(let i = 1; i < m; i++) {
    dp[i] = [grid[i][0] + dp[i - 1][0]];
  }
  for(let i = 1; i < n; i++) {
    dp[0][i] = grid[0][i] + dp[0][i - 1];
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
};

// for test
[
  [
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]
].forEach(grid => {
  console.log(minPathSum(grid));
});
```