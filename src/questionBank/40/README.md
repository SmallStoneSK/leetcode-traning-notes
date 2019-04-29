---
title: 40. 组合总和 Ⅱ
difficulty: 中等
related: 数组|dfs|递归
---

## 题目

给定一个数组`candidates`和一个目标数`target`，找出`candidates`中所有可以使数字和为`target`的组合。

`candidates`中的每个数字在每个组合中只能使用一次。

**说明：**

- 所有数字（包括目标数）都是正整数。
- 解集不能包含重复的组合。

## 示例1

**输入：** candidates = [10,1,2,7,6,1,5], target = 8

**输出：** [[1,1,6], [1,2,5], [1,7], [2,6]]

## 示例2

**输入：** candidates = [2,5,2,1,2], target = 5

**输出：** [[1,2,2], [5]]

## 解析

这题是[上一题](/questionBank/39/)的升级版，个人感觉更像是和[47题](/questionBank/47/)的结合。关键就在于每个数字只能用一次，且需要对得到的解去重。那么具体来说，相对于上一题需要做什么改变呢？

1. 由于每个数字只能用一次，所以在dfs深搜的时候，选取的数字不能再从candidates中找，而是每次取剩余的子集。
2. 由于同一轮中选取相同的数字，得到的解是相同的，所以可以借助一个hash来避免重复的求解计算。

## 代码

```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const answer = [];
  candidates.sort((a, b) => a - b);
  function find(subCandidates, target, tmpStack) {
    if(target === 0) {
      answer.push(tmpStack);
      return;
    }
    const hash = {};
    for(let i = 0, len = subCandidates.length; i < len; i++) {
      if(target < subCandidates[i]) {
        break;
      } else if(hash[subCandidates[i]]){
        continue;
      } else if(tmpStack.length > 0 && subCandidates[i] < tmpStack[tmpStack.length - 1]) {
        continue;
      } else {
        hash[subCandidates[i]] = true;
        const newCandidates = subCandidates.slice(0, i).concat(subCandidates.slice(i + 1));
        find(newCandidates, target - subCandidates[i], tmpStack.concat(subCandidates[i]));
      }
    }
  }
  find(candidates, target, []);
  return answer;
};

[
  [[2,5,2,1,2], 5],       // [[1,2,2],[5]]
  [[10,1,2,7,6,1,5], 8],  // [[1,1,6],[1,2,5],[1,7],[2,6]]
].forEach(([candidates, target]) => {
  console.log(JSON.stringify(combinationSum2(candidates, target)));
});
```