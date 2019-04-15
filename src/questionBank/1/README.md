---
title: 1.两数之和
difficulty: 简单
related: 数组|哈希表
---

## 题目

给定一个整数数组`nums`和一个目标值`target`，请你在该数组中找出和为目标值的那`两个`整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

## 示例

**输入：** nums = [2, 7, 11, 15]；target = 9

**输出：** [0, 1]

**原因：** nums[0] + nums[1] = 2 + 7 = 9

## 解析

水题，这道题最容易想到的就是暴力计算，两层for循环，但是时间复杂度O(n^2)上去了，所以不推荐。

换个思路，我们可以借助一个hashMap，在遍历的时候，用当前值作为key，索引index作为value保存到hashMap中。在每一轮循环的时候，我们根据curValue，targetValue就可以算出expectedValue。然后在hashMap中找是否能匹配，匹配的上的话就说明有解，直接返回即可。

改进之后，由于只需遍历一遍，所以时间复杂度减到了O(n)。但是，由于我们借助到一个hashMap，最多可能保存下所有数组元素，所以空间复杂度变成了O(n)，这也是一个典型的空间换时间的解法。

## 代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var hashMap = {};
    for(let i = 0, len = nums.length; i < len; i++) {
      var expectedNum = target - nums[i];
      if(hashMap[expectedNum] !== undefined) {
        return [hashMap[expectedNum], i];
      }
      hashMap[nums[i]] = i;
    }
};

// testing code
const nums = [2, 7, 11, 15];
const target = 9;
const ret = twoSum(nums, target);
console.log(ret);     // [0, 1]
```