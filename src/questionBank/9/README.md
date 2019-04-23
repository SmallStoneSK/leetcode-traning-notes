---
title: 9. 回文数
difficulty: 简单
related: 数学|回文
---

## 题目

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

## 示例1

**输入：** 121

**输出：** true

**原因：** 正序和倒序都是121

## 示例2

**输入：** -121

**输出：** false

**原因：** 从左向右读, 为`-121`。 从右向左读, 为`121-`。因此它不是一个回文数。

## 示例3

**输入：** 10

**输出：** false

**原因：** 从右向左读, 为`01`。因此它不是一个回文数。

## 解析

水题，回文串最简单的方法往往是将字符串`reverse`，然后与原字符串对比是否相等即可。但是，ACM中这往往是比较低效的解法。

就本题而言，给到的是一个数字而不是字符串，这又该怎么解呢？在这里，我们其实不一定非要转成字符串才能解题，可以利用10的`取余`和`除法`操作，取得每一位上的数字，然后再加回去与原数字相比较即可。就拿121举例：

121每一位上的数字分别是1、2、1，而倒序之后相加1 * 10<sup>2</sup> + 2 * 10<sup>1</sup> + 1 * 10<sup>0</sup>还是121，所以满足。

另外，还有3个地方可以优化：

1. 由于负数有`-`号，所以肯定不是回文数；
2. 10以内的数字，正序、倒序都是自己，所以肯定是回文数；
3. 被10整除的数字在倒序之后，首尾数字是0，所以肯定不是回文数。

## 代码

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  
  // 由于负数有-符号，所以肯定不是回文数
  // 10以内的证书，正/倒序都是其本身，所以肯定是回文数
  // 被10整除的数字，倒序之后首位是0，所以肯定不是回文数
  if(x < 0) {
    return false;
  } else if(x < 10) {
    return true;
  } else if(x % 10 === 0) {
    return false;
  }
  
  let y = 0;
  const copy = x;
  while(x) {
    y = y * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  
  return copy === y;
};

// testing code
[121, -121, 10].forEach(x => {
  console.log(isPalindrome(x));   // true, false, false
})
```