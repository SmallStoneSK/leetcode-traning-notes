const REGEX = /(CM|CD|XC|XL|IX|IV|M|D|C|L|X|V|I)/g;
const MAP = {
  'I': 1,
  'IV': 4,
  'V': 5,
  'IX': 9,
  'X': 10,
  'XL': 40,
  'L': 50,
  'XC': 90,
  'C': 100,
  'CD': 400,
  'D': 500,
  'CM': 900,
  'M': 1000
};

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  let num = 0;
  s.replace(REGEX, (match, $1) => {
    num += MAP[$1] || 0;
  });
  return num;
};

[
  'III',      // 3
  'IV',       // 4
  'IX',       // 9
  'LVIII',    // 58
  'MCMXCIV',  // 1994
].forEach(s => {
  console.log(romanToInt(s));
});