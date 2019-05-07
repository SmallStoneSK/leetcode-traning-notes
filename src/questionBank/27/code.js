/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let count = 0;
  for(let i = 0, len = nums.length; i < len; i++) {
    if(nums[i] !== val) {
      nums[count++] = nums[i];
    }
  }
  nums.length = count;
  return count;
};

// testing code
[
  [[3, 2, 2, 3], 3],              // [2, 2]
  [[0, 1, 2, 2, 3, 0, 4, 2], 2]   // [0, 1, 2, 3, 4]
].forEach((nums, val) => {
  removeElement(nums, val);
  console.log(JSON.stringify(nums));
});