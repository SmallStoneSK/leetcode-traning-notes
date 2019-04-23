---
title: 7. 整数反转
difficulty: 简单
related: 数学|回文
---

## 题目

给出一个`32`位的有符号整数，你需要将这个整数中每位上的数字进行反转。

## 示例1

**输入：** 123

**输出：** 321

## 示例2

**输入：** -123

**输出：** -321

## 示例3

**输入：** 120

**输出：** 21

## 注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

## 解析

水题，就是利用10的`取余`和`除法`操作，从个位往前叠加计算。

另外，需要注意的是一开始需要先记录下原数字的符号位，以便在翻转整数之后恢复符号位。

## 代码
```javascript
const MIN = -Math.pow(2, 31);
const MAX = Math.pow(2, 31) - 1;

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {

  // 记录是否为负数
  const isNegative = x < 0;
  x = Math.abs(x);

  // 从个位往前遍历，叠加计算
  let num = 0;
  while(x) {
    num = num * 10 + x % 10;
    x = Math.floor(x / 10);
  }

  // 如果原来是负数，加上符号
  if(isNegative) {
    num *= -1;
  }

  // 判断是否溢出
  if(num < MIN || num > MAX) {
    num = 0;
  }

  return num;
};

// testing code
[123, -123, 120].forEach(x => {
  console.log(reverse(x));  // 321, -321, 21
});
```