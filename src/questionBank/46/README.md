---
title: 46. 全排列
difficulty: 中等
related: 数组|dfs|递归
---

## 题目

给定一个没有重复数字的序列，返回其所有可能的全排列。

## 示例

**输入：** [1,2,3]

**输出：** [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

## 解析

排列组合的题目，很容易想到递归，其实就是dfs。

举个栗子：假如要求[1,2,3]的全排列，是不是可以看成以下三者的并集：

- 1开头时，[2,3]的全排列结果
- 2开头时，[1,3]的全排列结果
- 3开头时，[1,2]的全排列结果

以此类推，当求子集的全排列组合的时候又可以进一步拆解，直到子集没有时就找到一种组合了。而这个过程就是递归。

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const answer = [];
  function dfs(nums, tmpStack) {
    if(nums.length === 0) {
      answer.push(tmpStack);
      return;
    }
    for(let i = 0; i < nums.length; i++) {
      const restNums = nums.slice(0, i).concat(nums.slice(i + 1));
      dfs(restNums, tmpStack.concat(nums[i]));
    }
  }
  dfs(nums, []);
  return answer;
};

[
  [1,2],    // [[1,2],[2,1]]
  [1,2,3],  // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
].forEach(nums => {
  console.log(JSON.stringify(permute(nums)));
});
```