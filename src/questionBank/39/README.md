---
title: 39. 组合总和
difficulty: 中等
related: 数组|dfs|递归
---

## 题目

给定一个无重复元素的数组`candidates`和一个目标数`target`，找出`candidates`中所有可以使数字和为`target`的组合。

`candidates`中的数字可以无限制重复被选取。

**说明：**

- 所有数字（包括`target`）都是正整数。
- 解集不能包含重复的组合。

## 示例1

**输入：** candidates = [2,3,6,7], target = 7

**输出：** [[7], [2,2,3]]

## 示例2

**输入：** candidates = [2,3,5], target = 8

**输出：** [[2,2,2,2], [2,3,3], [3,5]]

## 解析

这是一道DFS深搜的题目，虽然不是很难，但是放在以前我是肯定解不出来的。。。

解这道题的关键还是在于如何拆分求解的过程，来举个栗子：

candidates&nbsp;=&nbsp;[2,3,6,7]，target&nbsp;=&nbsp;7时，应该怎么处理呢？

1. 首先，我们可以先尝试从candidates中取一个数2，那么问题是否就变成了从候选集[2,3,6,7]中选出合适的数构造成5。
2. 接着同样地，我们再从candidates中取2，问题又变成了从候选集[2,3,6,7]中选出合适的数构成3。
3. 很显然，此时我们已经找到一个符合题目要求的答案了，即[2,2,3]。

上述的过程是一个尝试成功的过程，原理其实就是把原问题不断拆分，直到找到解或者无解的时候再结束搜索，是一个典型的dfs问题。

大致的解题思路已经确定了，然后就是怎么优化搜索的过程了，即提前结束不可能找到解或重复解的搜索步骤（这个优化通常叫作剪枝）。

在本题中，我们可以先对输入的candidates候选集进行从低到高排序，对剪枝非常有帮助。

- 剪枝1：当target值小于候选集中的最小值时，肯定不可能存在解，可以提前结束搜索。
- 剪枝2：构造答案的tmpStack结果集时，如果取到当前候选集中的数小于tmpStack中的最大值时，得到的解是重复解，也可以提前结束搜索（详见代码）。还是上面的例子，从2开始搜索的时候，已经得到解[2,2,3]了；但是从3开始搜索的时候，tmpStack是[3]，如果在[2,3,6,7]构造4的时候，还取候选值2，那最终得到的解将会是[3,2,2]。这个解是重复的，所以在构造4的时候，候选集应该是[3,6,7]，过滤掉2的搜索过程，从而达到剪枝优化的效果。

## 代码

```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {

  const answer = [];

  // 对候选集进行排序，在深搜的时候有奇效
  candidates.sort((a, b) => a - b);

  /**
   * dfs深搜
   * @param {*} remain 剩余的值（target - tmpStack中已经选中的值）
   * @param {*} tmpStack 中间过程
   */
  function find(remain, tmpStack) {

    // 如果剩下的值已经是0了，说明tmpStack中的值刚好可以构成target，符合要求
    if(remain === 0) {
      answer.push(tmpStack);
      return;
    }

    // 遍历候选集
    for(const num of candidates) {

      // 剪枝1：由于候选集已经排序过，如果当前的值已经比remain大，那么候选集中后面的值肯定也不符合，所以不必再继续
      if(num > remain) {
        break;
      }

      // 剪枝2：由于排序的关系，tmpStack中的值也是有序的，如果当前值比tmpStack的最大值小时是没必要继续dfs的，因为得到的结果也是重复的
      if(tmpStack.length > 0 && num < tmpStack[tmpStack.length - 1]) {
        continue;
      }

      // dfs，问题变成从candidates中找符合target - num的存在
      find(remain - num, [...tmpStack, num]);
    }
  }

  find(target, []);
  return answer;
};

[
  [[2], 1],
  [[2, 3, 4], 9],
  [[2, 3, 5], 8],
  [[2, 3, 6, 7], 7],
].forEach(([candidates, target]) => {
  console.log(JSON.stringify(combinationSum(candidates, target)));
});
```