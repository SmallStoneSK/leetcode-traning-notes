---
title: 14. 最长公共子串
difficulty: 简单
related: 字符串
---

## 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串`""`。

## 示例1

**输入：** ["flower", "flow", "flight"]

**输出：** "fl"

## 示例2

**输入：** ["dog", "racecar", "car"]

**输出：** ""

**原因：** 输入不存在公共前缀。

## 解析

简单的模拟题，strs中的每个字符串同时开始查找，一旦遇到不全部相等时就停止查找，然后提取出`[0, 当前位置]`的字符串子串即可。

## 代码

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {

  // 非法值过滤
  if(strs.length === 0) {
    return '';
  }

  let pos = 0;
  const len = Math.min(...strs.map(s => s.length));
  for(; pos < len; pos++) {
    const chars = strs.map(s => s[pos]);
    const comparedChar = chars[0];
    if(!chars.reduce((prev, cur) => prev && (cur === comparedChar), true)) {
      break;
    }
  }
  return strs[0].substring(0, pos);
};

// testing code
[
  [],                           // ""
  ["flower","flow","flight"],   // "fl"
  ["dog","racecar","car"],      // ""
].forEach(strs => {
  console.log(longestCommonPrefix(strs));
});
```