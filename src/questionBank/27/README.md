---
title: 27. 移除元素
difficulty: 简单
related: 数组
---

## 题目

给定一个数组`nums`和一个值`val`，你需要原地移除所有数值等于`val`的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用`O(1)`额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

## 示例

**输入：** nums = [3,2,2,3], val = 3

**输出：** [2,2]

## 示例

**输入：** nums = [0,1,2,2,3,0,4,2], val = 2

**输出：** [0,1,2,3,4]

## 解析

解题思路和[上一题](/questionBank/26/)基本一致，遍历数组的时候，遇到与目标值不想等的时候覆盖掉原数组中的值即可。

## 代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let count = 0;
  for(let i = 0, len = nums.length; i < len; i++) {
    if(nums[i] !== val) {
      nums[count++] = nums[i];
    }
  }
  nums.length = count;
  return count;
};

// testing code
[
  [[3, 2, 2, 3], 3],              // [2, 2]
  [[0, 1, 2, 2, 3, 0, 4, 2], 2]   // [0, 1, 2, 3, 4]
].forEach((nums, val) => {
  removeElement(nums, val);
  console.log(JSON.stringify(nums));
});
```