---
title: 35. 搜索插入位置
difficulty: 简单
related: 数组|二分查找
---

## 题目

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

## 示例1

**输入：** [1,3,5,6], 5

**输出：** 2

## 示例2

**输入：** [1,3,5,6], 2

**输出：** 1

## 示例3

**输入：** [1,3,5,6], 7

**输出：** 4

## 示例4

**输入：** [1,3,5,6], 0

**输出：** 0

## 解析

很简单的一道题目，遍历一遍即可，时间复杂度O(n)。

不过，看到题目说`假设数组中无重复元素`就知道，可以尝试用二分查找来解题。二分的过程也很简单，时间复杂度可以降到O(log n)。

## 代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  for (let i = 0, len = nums.length; i < len; i++) {
    if(nums[i] >= target) {
      return i;
    }
  }
  return nums.length;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var optimizedSearchInsert = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while(low < high) {
    const mid = Math.floor((low + high) / 2);
    if(nums[mid] === target) {
      return mid;
    } else if(nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return target <= nums[low] ? low : low + 1;
};

// testing code
[
  [[1], 1],         // 0
  [[1,3,5,6], 5],   // 2
  [[1,3,5,6], 2],   // 1
  [[1,3,5,6], 7],   // 4
  [[1,3,5,6], 0],   // 0
].forEach(([nums, target]) => {
  console.log(optimizedSearchInsert(nums, target));
});
```