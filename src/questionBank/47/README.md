---
title: 47. 全排列 Ⅱ
difficulty: 中等
related: 数组|dfs|递归
---

## 题目

给定一个可包含重复数字的序列，返回所有不重复的全排列。

## 示例

**输入：** [1,1,2]

**输出：** [[1,1,2],[1,2,1],[2,1,1]]

## 解析

这一题是上一题的升级版，解题思路基本一样，只是输入中会有重复数字，导致全排列的结果中会有重复的情况。

最简单的方法当然是直接对得到的结果用set进行去重，但显然这不是一个好办法。其实，要解决重复的问题也不难，只要在递归的过程中不要将相同的排列压入结果即可。那么应该怎么做呢？就拿112举例：

在选取第一个数字的时候，本应该有3个选择：1，1和2。

但显然，这里两个1作为首数字时，构造的结果肯定是相同的。因此，在每一轮选择时，可以借助一个hash来记录本轮使用过的数字，如果已经被选择过，那就不必要再递归了。

以上就是相对上一题的改变之处。

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  const answer = [];
  function dfs(nums, tmpStack) {
    if(nums.length === 0) {
      answer.push(tmpStack);
      return;
    }
    // 用一个hash来记录本轮出现过的数字，出现过就不用再重新排列组合了，因为结果肯定重复的
    const hash = {};
    for(let i = 0; i < nums.length; i++) {
      if(!hash[nums[i]]) {
        hash[nums[i]] = true;
        const restNums = nums.slice(0, i).concat(nums.slice(i + 1));
        dfs(restNums, tmpStack.concat(nums[i]));
      }
    }
  }
  dfs(nums, []);
  return answer;
};

[
  [1,1,2],    // [[1,1,2], [1,2,1], [2,1,1]]
  [1,1,2,2],  // [[1,1,2,2], [1,2,1,2], [1,2,2,1], [2,1,1,2], [2,1,2,1], [2,2,1,1]]
].forEach(nums => {
  console.log(JSON.stringify(permuteUnique(nums)));
});
```