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