/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  const answer = [];
  function dfs(nums, tmpStack) {
    if(nums.length === 0) {
      answer.push(tmpStack);
      return;
    }
    // 用一个hash来记录本轮出现过的数字，出现过就不用再重新排列组合了，因为结果肯定重复的
    const hash = {};
    for(let i = 0; i < nums.length; i++) {
      if(!hash[nums[i]]) {
        hash[nums[i]] = true;
        const restNums = nums.slice(0, i).concat(nums.slice(i + 1));
        dfs(restNums, tmpStack.concat(nums[i]));
      }
    }
  }
  dfs(nums, []);
  return answer;
};

[
  [1,1,2],    // [[1,1,2], [1,2,1], [2,1,1]]
  [1,1,2,2],  // [[1,1,2,2], [1,2,1,2], [1,2,2,1], [2,1,1,2], [2,1,2,1], [2,2,1,1]]
].forEach(nums => {
  console.log(JSON.stringify(permuteUnique(nums)));
});