const MIN = -Math.pow(2, 31);
const MAX = Math.pow(2, 31) - 1;

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {

  // 记录是否为负数
  const isNegative = x < 0;
  x = Math.abs(x);

  // 从个位往前遍历，叠加计算
  let num = 0;
  while(x) {
    num = num * 10 + x % 10;
    x = Math.floor(x / 10);
  }

  // 如果原来是负数，加上符号
  if(isNegative) {
    num *= -1;
  }

  // 判断是否溢出
  if(num < MIN || num > MAX) {
    num = 0;
  }

  return num;
};

// testing code
[123, -123, 120].forEach(x => {
  console.log(reverse(x));  // 321, -321, 21
});