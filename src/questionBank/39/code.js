/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {

  const answer = [];

  // 对候选集进行排序，在深搜的时候有奇效
  candidates.sort((a, b) => a - b);

  /**
   * dfs深搜
   * @param {*} remain 剩余的值（target - tmpStack中已经选中的值）
   * @param {*} tmpStack 中间过程
   */
  function find(remain, tmpStack) {

    // 如果剩下的值已经是0了，说明tmpStack中的值刚好可以构成target，符合要求
    if(remain === 0) {
      answer.push(tmpStack);
      return;
    }

    // 遍历候选集
    for(const num of candidates) {

      // 剪枝1：由于候选集已经排序过，如果当前的值已经比remain大，那么候选集中后面的值肯定也不符合，所以不必再继续
      if(num > remain) {
        break;
      }

      // 剪枝2：由于排序的关系，tmpStack中的值也是有序的，如果当前值比tmpStack的最大值小时是没必要继续dfs的，因为得到的结果也是重复的
      if(tmpStack.length > 0 && num < tmpStack[tmpStack.length - 1]) {
        continue;
      }

      // dfs，问题变成从candidates中找符合target - num的存在
      find(remain - num, [...tmpStack, num]);
    }
  }

  find(target, []);
  return answer;
};

[
  [[2], 1],
  [[2, 3, 4], 9],
  [[2, 3, 5], 8],
  [[2, 3, 6, 7], 7],
].forEach(([candidates, target]) => {
  console.log(JSON.stringify(combinationSum(candidates, target)));
});