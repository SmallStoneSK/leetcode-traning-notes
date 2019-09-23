/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {

  const m = grid.length;
  const n = grid[0].length;

  const dp = [[grid[0][0]]];
  for(let i = 1; i < m; i++) {
    dp[i] = [grid[i][0] + dp[i - 1][0]];
  }
  for(let i = 1; i < n; i++) {
    dp[0][i] = grid[0][i] + dp[0][i - 1];
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
};

// for test
[
  [
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]
].forEach(grid => {
  console.log(minPathSum(grid));
});
