---
title: 120. 三角形最小路径和
difficulty: 中等
related: 数组|动态规划
---

## 题目

给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。例如，给定三角形：

```json
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
```

自顶向下的最小路径和为`11`（即：`2 + 3 + 5 + 1 = 11`）。

**说明：**

如果你可以只使用`O(n)`的额外空间（`n`为三角形的总行数）来解决这个问题，那么你的算法会很加分。

## 示例

**输入：** 

```json
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
```

**输出：** 

11

**解释：** 自顶向下的最小路径和为`11`（即：`2 + 3 + 5 + 1 = 11`）。

## 解析

这又是一道典型用`动态规划`方法来解决的题目。

1. 初始化`dp`数组的时候，计算`首行`这一步骤和往常有点不一样。以往是给`dp[0][i]`赋值，而在三角形这道题中，则是给`dp[i][i]`（即对角线）赋值。

2. 状态转移方程也是很容易得到：

`dp[i][j] = Math.min(dp[i - 1][j - 1], (dp[i - 1][j])) + triangle[i][j]`

根据以上两点我们就能轻易地写出`dp`解题过程了。

## 代码

```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  
  const m = triangle.length;
  const n = triangle[m - 1].length;

  const dp = [[triangle[0][0]]];
  for(let i = 1; i < m; i++) {
    dp[i] = [dp[i - 1][0] + triangle[i][0]];
  }
  for(let i = 1; i < n; i++) {
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], (dp[i - 1][j])) + triangle[i][j];
    }
  }

  return Math.min(...dp[m - 1]);
};

// for test
[
  [
    [2],
    [3,4],
    [6,5,7],
    [4,1,8,3]
  ],
  [
    [-7],
    [-2,1],
    [-5,-5,9],
    [-4,-5,4,4],
    [-6,-6,2,-1,-5],
    [3,7,8,-3,7,-9],
    [-9,-1,-9,6,9,0,7],
    [-7,0,-6,-8,7,1,-4,9],
    [-3,2,-6,-9,-7,-6,-9,4,0],
    [-8,-6,-3,-9,-2,-6,7,-5,0,7],
    [-9,-1,-2,4,-2,4,4,-1,2,-5,5],
    [1,1,-6,1,-2,-4,4,-2,6,-6,0,6],
    [-3,-3,-6,-2,-6,-2,7,-9,-5,-7,-5,5,1]
  ]
].forEach(triangle => {
  console.log(minimumTotal(triangle));
});

```
