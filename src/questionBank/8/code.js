const MIN = -Math.pow(2, 31);
const MAX = Math.pow(2, 31) - 1;
const NUM_REGEX = /^\s*(\+|-)?0*(\d+)/;

/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {

  // 非法值过滤
  if(typeof str !== 'string' || str === '') {
    return 0;
  }

  // 用正则匹配一下，提取出其中有效的数字部分（不匹配的，直接返回0）
  const regRet = str.match(NUM_REGEX);
  if(!regRet) {
    return 0;
  }

  // 提取出相应的 符号 和 数字 部分
  const [, symbol, num] = regRet;

  // 数字部分超过10位，肯定溢出了
  if(num.length > 10) {
    return symbol === '-' ? MIN : MAX;
  }

  // 将字符串的num，转化成数字number类型
  let ret = 0;
  for(let i = 0, len = num.length; i < len; i++) {
    ret += (num[i] - '0') * Math.pow(10, len - i - 1);
  }
  
  // 如果符号位是-，将其乘以-1
  if(symbol === '-') {
    ret *= -1;
  }

  // 判断结果是否溢出，溢出的话返回MIN或MAX，否则返回转换得到的结果
  if(ret < MIN) {
    return MIN;
  } else if(ret > MAX) {
    return MAX;
  } else {
    return ret;
  }
};

// testing code
[
  '42',                   // 42
  '   -42',               // -42
  '4193 with words',      // 4193
  'words and 987',        // 0
  '-91283472332',         // -2147483648
  '  0000000000012345678' // 12345678
].forEach(str => {
  console.log(myAtoi(str));
});