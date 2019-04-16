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