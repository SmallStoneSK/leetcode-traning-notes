---
title: 63. 不同路径 II
difficulty: 中等
related: 数组|动态规划
---

## 题目

一个机器人位于一个`m`x`n`网格的左上角（起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

![示例图](./robot_maze.png)

网格中的障碍物和空位置分别用`1`和`0`来表示。

说明：`m`和`n`的值均不超过`100`。

## 示例

**输入：** 

```json
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
```

**输出：** 2

**解释：** 

3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：

1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右

## 解析

本题是[上一题](https://smallstonesk.github.io/leetcode-traning-notes/docs/questionBank/62/)的改进版，但其实解题思路基本一致，只是多了某个格子是否障碍物的判断。为此，我们只需做出如下改变：

1. 在初始化`dp`二维数组的首行/首列时，不再粗暴地直接赋值为1，而是判断之前是否有障碍物。
2. 在生成`dp`子问题解的时候，判断当前/上边/左边是否为障碍物，然后根据不同情况得到到达当前点的路径数。

## 代码

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {

  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  
  const dp = [];
  let hasObstacle = false;
  for(let i = 0; i < m; i++) {
    hasObstacle = hasObstacle || !!obstacleGrid[i][0];
    dp[i] = hasObstacle ? [0] : [1];
  }
  hasObstacle = false
  for(let i = 0; i < n; i++) {
    hasObstacle = hasObstacle || !!obstacleGrid[0][i];
    dp[0][i] = hasObstacle ? 0 : 1;
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n ; j++) {
      if(obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else if(obstacleGrid[i][j - 1] === 1) {
        dp[i][j] = dp[i - 1][j];
      } else if(obstacleGrid[i - 1][j] === 1) {
        dp[i][j] = dp[i][j - 1];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
};

// for test
[
  [[1]],
  [[1, 0]],
  [
    [0,0,0],
    [0,1,0],
    [0,0,0]
  ]
].forEach(obstacleGrid => {
  console.log(uniquePathsWithObstacles(obstacleGrid));
});
```