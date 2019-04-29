/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  
  // 检查一行是否有重复元素
  function checkRow() {
    for(let i = 0; i < 9; i++) {
      const hash = {};
      for(let j = 0; j < 9; j++) {
        const element = board[i][j];
        if(element === '.') {
          continue;
        } else if(hash[element]) {
          return false;
        } else {
          hash[element] = true;
        }
      }
    }
    return true;
  }

  // 检查一列是否有重复元素
  function checkColumn() {
    for(let i = 0; i < 9; i++) {
      const hash = {};
      for(let j = 0; j < 9; j++) {
        const element = board[j][i];
        if(element === '.') {
          continue;
        } else if(hash[element]) {
          return false;
        } else {
          hash[element] = true;
        }
      }
    }
    return true;
  }

  // 检查宫格是否有重复元素
  function checkBox() {
    for(let i = 0; i < 9; i += 3) {
      for(let j = 0; j < 9; j += 3) {
        const hash = {};
        for(let m = 0; m < 3; m++) {
          for(let n = 0; n < 3; n++) {
            const element = board[i + m][j + n];
            if(element === '.') {
              continue;
            } else if(hash[element]) {
              return false;
            } else {
              hash[element] = true;
            }
          }
        }
      }
    }
    return true;
  }

  return checkRow() && checkColumn() && checkBox();
};

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var optimiziedIsValidSudoku = function(board) {

  const rowMap = new Array(9).fill(1).map(() => ({}));
  const columnMap = new Array(9).fill(1).map(() => ({}));
  const boxMap = new Array(9).fill(1).map(() => ({}));

  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      const element = board[i][j];
      if(element === '.') continue;
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if(
        rowMap[i][element] ||
        columnMap[j][element] ||
        boxMap[boxIndex][element]
      ) {
        return false;
      }
      rowMap[i][element] = true;
      columnMap[j][element] = true;
      boxMap[boxIndex][element] = true;
    }
  }

  return true;
}

// testing code
console.log(optimiziedIsValidSudoku(
  [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
  ]
));
