---
title: 3. 无重复字符的最长子串
difficulty: 中等
related: 哈希表|双指针|字符串|滑动窗口
---

## 题目

给定一个字符串，请你找出其中不含有重复字符的`最长子串`的长度。

## 示例1

**输入：** "abcabcbb"

**输出：** 3

**原因：** 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

## 示例2

**输入：** "bbbbb"

**输出：** 1

**原因：** 因为无重复字符的最长子串是 "b"，所以其长度为 1。

## 示例3

**输入：** "pwwkew"

**输出：** 3

**原因：** 因为无重复字符的最长子串是 "wke"，所以其长度为 3。

## 解析

对于这道题目首先想到的肯定是暴力解决：两层for循环，i从0开始，j从i开始，找到每个s[i]开头的最长无重复子串。而且如果这里通过indexOf判断字符串中是否有某个字符的方法来判断是否为重复子串，那时间复杂度甚至成了O(n^3)，所以不可取。

那么如何优化呢？优化的关键还是在于减少重复、不必要的步骤。那么上述的暴力算法中什么步骤是重复的呢？

问题1：j每次都从i开始往后找！就拿第一个示例`abcabcbb`举例，i=0时，j到3的时候发现重复了，然后i=1的时候，j又从1开始往后找，依次经历了`b`，`bc`，`bca`，`bcab`才发现重复了。其中，在i=0这一轮的时候，中间的`b`，`bc`这两个子串已经验证过了是不重复的，所以这两步是多余的！

问题2：上述的算法中提到判断字符串是否有重复使用indexOf方法，这个方法可以其实是可以看做O(n)的时间复杂度。

针对上述两个问题，我们可以这样来处理：

### 方案1

使用两个指针`i`，`j`来构造一个`s串`的滑动窗口，另外借助一个`set`来保存当前子串中的值。

首先，指针`j`先行，每走一步都判断当前`set`中是否包含`s[j]`。如果不包含，说明还没有构成重复子串，那就将`s[j]`压入`set`，j继续往前走，并记录当前子串长度。但是，如果`set`包含`s[j]`，说明此时已经有重复子串了，那么就令指针`i`往前走，并且移除`set`中`s[i]`的值。

注意，这是优化的关键步骤。其实不难发现，滑动窗口`s[i]`~`s[j]`就是我们的子串，利用这个滑动窗口，我们的指针j不必每一轮都从i开始了（解决了问题1）。另外，由于每个字符值都被存在了`set`中，判断会不会构成重复字符串的时间复杂度降到了O(1)（解决了问题2）。

指针i和j都从头至尾走了一遍，所以时间复杂度是O(2n)，也就是O(n)。由于借助到一个set，所以空间复杂度是O(n)。

### 方案2

上述的方案相对于一开始的暴力法已经前进一大步了，但其实还有优化的空间。

**当指针`j`后移发现和`j′`重复的时候，指针`i`不必每次一个一个的后移，而是直接跳到`j′+1`的位置！**

因为指针`i`在`j′+1`之前，滑动窗口`s[i]`~`s[j]`肯定还是重复的子串，这中间的尝试过程又是重复的。而下一个不重复子串应该是从`s[j′+1]`~`s[j]`开始尝试，所以指针`i`可以直接跳到`j′+1`的位置。

这里需要注意的是，由于这里我们需要知道发生重复时`j′+1`的位置，就不能用`set`来辅助了，而是需要一个`map`同时记录下索引`i`和字符`s[i]`的值。

## 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  return optimizedSolution(s);
};

function solution(s) {
  const len = s.length;
  const set = new Set();
  let i = j = result = 0;
  // s[i]~s[j]构成子串，指针j往前移
  // 如果set中不存在s[j]，则压入到set中；
  // 如果存在，说明构成重复子串了，指针i往前移，并将s[i]从set中剔除
  while(i < len && j < len) {
    if(!set.has(s[j])) {
      set.add(s[j++]);
      result = Math.max(result, j - i);
    } else {
      set.delete(s[i++]);
    }
  }
  return result;
}

function optimizedSolution(s) {
  const map = new Map();
  const len = s.length;
  let i = j = result = 0;
  // 思路和solution1基本一致，只是发现重复的时候，指针i直接跳到重复字符的位置
  // 所以set升级成map，在记录字符的同时，记录下字符所在的位置
  while(i < len && j < len) {
    const cache = map.get(s[j]);
    if(cache === undefined) {
      map.set(s[j], j++);
      result = Math.max(result, j - i);
    } else {
      while(i <= cache) {
        map.delete(s[i++]);
      }
      i = cache + 1;
    }
  }
  return result;
}

// testing code
['pwwkew', 'abcabcbb', 'bbbbb', 'pwwkew'].forEach(s => {
  console.log(lengthOfLongestSubstring(s));    // 3, 1, 3
});
```