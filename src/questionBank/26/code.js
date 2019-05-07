/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  
  if(nums.length === 0) {
    return 0;
  }
  
  let count = 1;
  let prevNum = nums[0];
  for(let i = 1, len = nums.length; i < len; i++) {
    if(nums[i] != prevNum) {
      prevNum = nums[i];
      nums[count++] = nums[i];
    }
  }
  
  nums.length = count;
  return count;
};

// testing code
[
  [1, 1, 2],                        // [1, 2]
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]    // [0, 1, 2, 3, 4]
].forEach(nums => {
  removeDuplicates(nums);
  console.log(JSON.stringify(nums));
});