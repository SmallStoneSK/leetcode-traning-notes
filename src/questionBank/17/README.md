---
title: 17. 电话号码的字母组合
difficulty: 中等
related: 字符串|排列组合|递归
---

## 题目

给定一个仅包含数字`2-9`的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意`1`不对应任何字母。

![电话键盘](./telephone-keyboard.png)

## 示例

**输入：** "23"

**输出：** ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

## 解析

这是一道典型的排列组合题目，可以用递归的方法解决。

首先，我们可以根据电话上的数字构造字典映射如下：

|数字|对应的可选字符串|
|---|------------|
|2|['a', 'b', 'c']|
|3|['d', 'e', 'f']|
|4|['g', 'h', 'i']|
|5|['j', 'k', 'l']|
|6|['m', 'n', 'o']|
|7|['p', 'q', 'r', 's']|
|8|['t', 'u', 'v']|
|9|['w', 'x', 'y', 'z']|

然后，我们拿"2345"构造全排列组合的过程，来分析递归步骤：

1. "2345" = f("2", "2345")

2. f("2", "2345") = combine("2", f("3", "45"))

3. f("3", "45") = combine("3", f("4", "5"))

4. f("4", "5") = combine("4", "5")

5. combine("4", "5") = ["gj", "gk", "gl", "hj", "hk", "hl", "ij", "ik", "il"]

其中，f函数就是我们的递归函数，第一个参数是当前的数字，第二个参数是后面的子串。combine是全排列组合的函数。

直到当子串也是1个字符的时候，我们就可以直接用上排列组合了。

## 代码

```javascript
const PHONE_MAP = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if(digits.length > 1) {
    return combine(digits[0], digits.slice(1));
  } else if(digits.length === 1) {
    return PHONE_MAP[digits];   // 此时digits就是一个字符，直接映射PHONE_MAP就好
  } else {
    return [];
  }
};

function combine(curDigit, digits) {
  // digits只有1位的时候，说明已经到最后了，直接排列组合拼接；否则，递归构造
  const ret = [];
  const arrA = PHONE_MAP[curDigit];
  const arrB = digits.length === 1 ? PHONE_MAP[digits] : combine(digits[0], digits.slice(1));
  arrA.forEach(charA => {
    arrB.forEach(charB => ret.push(charA + charB));
  });
  return ret;
}

// tesing code
['4', '23', '567'].forEach(s => {
  console.log(letterCombinations(s));
});
```