/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  
  const m = triangle.length;
  const n = triangle[m - 1].length;

  const dp = [[triangle[0][0]]];
  for(let i = 1; i < m; i++) {
    dp[i] = [dp[i - 1][0] + triangle[i][0]];
  }
  for(let i = 1; i < n; i++) {
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], (dp[i - 1][j])) + triangle[i][j];
    }
  }

  return Math.min(...dp[m - 1]);
};

// for test
[
  [
    [2],
    [3,4],
    [6,5,7],
    [4,1,8,3]
  ],
  [
    [-7],
    [-2,1],
    [-5,-5,9],
    [-4,-5,4,4],
    [-6,-6,2,-1,-5],
    [3,7,8,-3,7,-9],
    [-9,-1,-9,6,9,0,7],
    [-7,0,-6,-8,7,1,-4,9],
    [-3,2,-6,-9,-7,-6,-9,4,0],
    [-8,-6,-3,-9,-2,-6,7,-5,0,7],
    [-9,-1,-2,4,-2,4,4,-1,2,-5,5],
    [1,1,-6,1,-2,-4,4,-2,6,-6,0,6],
    [-3,-3,-6,-2,-6,-2,7,-9,-5,-7,-5,5,1]
  ]
].forEach(triangle => {
  console.log(minimumTotal(triangle));
});
