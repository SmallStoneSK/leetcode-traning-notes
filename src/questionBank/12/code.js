/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
  let ret = '';
  const values = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  const symbols = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
  for(let i = 12; i >= 0; i--) {
    while(num >= values[i]) {
      ret += symbols[i];
      num -= values[i];
    }
  }
  return ret;
};

[
  3,    // III
  4,    // IV
  9,    // IX
  58,   // LVIII
  1994, // MCMXCIV
].forEach(num => {
  console.log(intToRoman(num));
});