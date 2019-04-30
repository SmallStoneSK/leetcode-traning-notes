const cache = [, '1'];

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  if(cache[n]) {
    return cache[n];
  } else {
    const str = countAndSay(n - 1);
    // 直接用正则匹配
    cache[n] = str.match(/(\d)\1*/g).map(item => item.length + item[0]).join('');
    return cache[n];
  }
};

// testing code
[
  1,    // 1
  2,    // 11
  3,    // 21
  4,    // 1211
  5,    // 111221
  6,    // 312211
  7,    // 13112221
  8,    // 1113213211
  9,    // 31131211131221
  10,   // 13211311123113112211
].forEach(n => {
  console.log(n, '\t\t//', countAndSay(n));
});