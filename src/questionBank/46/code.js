/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const answer = [];
  function dfs(nums, tmpStack) {
    if(nums.length === 0) {
      answer.push(tmpStack);
      return;
    }
    for(let i = 0; i < nums.length; i++) {
      const restNums = nums.slice(0, i).concat(nums.slice(i + 1));
      dfs(restNums, tmpStack.concat(nums[i]));
    }
  }
  dfs(nums, []);
  return answer;
};

[
  [1,2],
  [1,2,3],
  [1,3,5,7]
].forEach(nums => {
  console.log(JSON.stringify(permute(nums)));
});