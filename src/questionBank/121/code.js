/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  
  const dp = [];
  for(let i = prices.length - 1; i >= 0; i--) {
    if(i === prices.length - 1) {
      dp[i] = prices[i];
    } else {
      dp[i] = Math.max(dp[i + 1], prices[i]);
    }
  }

  let ans = 0;
  for(let i = 0; i < dp.length - 1; i++) {
    if(prices[i] < dp[i + 1]) {
      ans = Math.max(ans, dp[i + 1] - prices[i]);
    }
  }

  return ans;
};

// for test

[
  [7,1,5,3,6,4],
  [7,6,4,3,1]
].forEach(prices => {
  console.log(maxProfit(prices));
});
