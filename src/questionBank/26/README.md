---
title: 26. 删除排序数组中的重复项
difficulty: 简单
related: 数组
---

## 题目

给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 **原地修改输入数组** 并在使用`O(1)`额外空间的条件下完成。

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以 **“引用”** 方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

## 示例1

**输入：** [1,1,2]

**输出：** [1,2]

## 示例2

**输入：** [0,0,1,1,1,2,2,3,3,4]

**输出：** [0,1,2,3,4]

## 解析

由于数组是有序的，所以重复的元素都是相邻的。为此，我们用一个变量记住前一个元素，然后和当前元素对比即可。

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  
  if(nums.length === 0) {
    return 0;
  }
  
  let count = 1;
  let prevNum = nums[0];
  for(let i = 1, len = nums.length; i < len; i++) {
    if(nums[i] != prevNum) {
      prevNum = nums[i];
      nums[count++] = nums[i];
    }
  }
  
  nums.length = count;
  return count;
};

// testing code
[
  [1, 1, 2],                        // [1, 2]
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]    // [0, 1, 2, 3, 4]
].forEach(nums => {
  removeDuplicates(nums);
  console.log(JSON.stringify(nums));
});
```