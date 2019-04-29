/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const answer = [];
  candidates.sort((a, b) => a - b);
  function find(subCandidates, target, tmpStack) {
    if(target === 0) {
      answer.push(tmpStack);
      return;
    }
    const hash = {};
    for(let i = 0, len = subCandidates.length; i < len; i++) {
      if(target < subCandidates[i]) {
        break;
      } else if(hash[subCandidates[i]]){
        continue;
      } else if(tmpStack.length > 0 && subCandidates[i] < tmpStack[tmpStack.length - 1]) {
        continue;
      } else {
        hash[subCandidates[i]] = true;
        const newCandidates = subCandidates.slice(0, i).concat(subCandidates.slice(i + 1));
        find(newCandidates, target - subCandidates[i], tmpStack.concat(subCandidates[i]));
      }
    }
  }
  find(candidates, target, []);
  return answer;
};

// testing code
[
  [[2,5,2,1,2], 5],       // [[1,2,2],[5]]
  [[10,1,2,7,6,1,5], 8],  // [[1,1,6],[1,2,5],[1,7],[2,6]]
].forEach(([candidates, target]) => {
  console.log(JSON.stringify(combinationSum2(candidates, target)));
});