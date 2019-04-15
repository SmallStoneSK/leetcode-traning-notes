/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var hashMap = {};
    for(let i = 0, len = nums.length; i < len; i++) {
      var expectedNum = target - nums[i];
      if(hashMap[expectedNum] !== undefined) {
        return [hashMap[expectedNum], i];
      }
      hashMap[nums[i]] = i;
    }
};

// testing code
const nums = [2, 7, 11, 15];
const target = 9;
const ret = twoSum(nums, target);
console.log(ret);     // [0, 1]