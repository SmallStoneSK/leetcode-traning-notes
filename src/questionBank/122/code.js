/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let profit = 0;
  const len = prices.length;
  for(let i = 1; i < len; i++) {
    const diff = prices[i] - prices[i - 1];
    if(diff > 0) {
      profit += diff;
    }
  }
  return profit;
};

// for test

[
  [7,1,5,3,6,4],
  [1,2,3,4,5],
  [7,6,4,3,1]
].forEach(prices => {
  console.log(maxProfit(prices));
});
