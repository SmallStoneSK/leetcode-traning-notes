/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  for (let i = 0, len = nums.length; i < len; i++) {
    if(nums[i] >= target) {
      return i;
    }
  }
  return nums.length;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var optimizedSearchInsert = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while(low < high) {
    const mid = Math.floor((low + high) / 2);
    if(nums[mid] === target) {
      return mid;
    } else if(nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return target <= nums[low] ? low : low + 1;
};

// testing code
[
  [[1], 1],
  [[1,3,5,6], 5],
  [[1,3,5,6], 2],
  [[1,3,5,6], 7],
  [[1,3,5,6], 0]
].forEach(([nums, target]) => {
  console.log(optimizedSearchInsert(nums, target));
});