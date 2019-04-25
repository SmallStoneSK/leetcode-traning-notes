const cache = [, ['()']];

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  if(cache[n]) {
    return cache[n];
  } else {
    const ret = [];
    const tmp = generateParenthesis(n - 1);
    tmp.forEach(str => {
      for(let i = 0, len = str.length; i <= len; i++) {
        const s = str.substring(0, i) + '()' + str.substring(i, len);
        ret.push(s);
      }
    });
    cache[n] = Array.from(new Set(ret));
    return cache[n];
  }
};

// tesing code
[
  1,    // ["()"]
  2,    // ["()()", "(())"]
  3,    // ["()()()", "(())()", "()(())", "(()())", "((()))"]
].forEach(n => {
  console.log(generateParenthesis(n));
});