/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {

  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  
  const dp = [];
  let hasObstacle = false;
  for(let i = 0; i < m; i++) {
    hasObstacle = hasObstacle || !!obstacleGrid[i][0];
    dp[i] = hasObstacle ? [0] : [1];
  }
  hasObstacle = false
  for(let i = 0; i < n; i++) {
    hasObstacle = hasObstacle || !!obstacleGrid[0][i];
    dp[0][i] = hasObstacle ? 0 : 1;
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n ; j++) {
      if(obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else if(obstacleGrid[i][j - 1] === 1) {
        dp[i][j] = dp[i - 1][j];
      } else if(obstacleGrid[i - 1][j] === 1) {
        dp[i][j] = dp[i][j - 1];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
};

// for test
[
  [[1]],
  [[1, 0]],
  [
    [0,0,0],
    [0,1,0],
    [0,0,0]
  ]
].forEach(obstacleGrid => {
  console.log(uniquePathsWithObstacles(obstacleGrid));
});
