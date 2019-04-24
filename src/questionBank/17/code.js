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