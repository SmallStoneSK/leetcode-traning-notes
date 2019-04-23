/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  
  // 由于负数有-符号，所以肯定不是回文数
  // 10以内的证书，正/倒序都是其本身，所以肯定是回文数
  // 被10整除的数字，倒序之后首位是0，所以肯定不是回文数
  if(x < 0) {
    return false;
  } else if(x < 10) {
    return true;
  } else if(x % 10 === 0) {
    return false;
  }
  
  let y = 0;
  const copy = x;
  while(x) {
    y = y * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  
  return copy === y;
};

isPalindrome(121);