---
title: 36. 有效的数独
difficulty: 中等
related: 哈希表
---

## 题目

判断一个`9x9`的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

1. 数字`1-9`在每一行只能出现一次。
2. 数字`1-9`在每一列只能出现一次。
3. 数字`1-9`在每一个以粗实线分隔的`3x3`宫内只能出现一次。

![上面是一个有效的数独](./Sudoku.png)

数独部分空格内已填入了数字，空白格用`'.'`表示。

**说明：**

- 一个有效的数独（部分已被填充）不一定是可解的。
- 只需要根据以上规则，验证已经填入的数字是否有效即可。
- 给定数独序列只包含数字`1-9`和字符`'.'`。
- 给定数独永远是`9x9`形式的。

## 示例1

**输入：** 

```js
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
```

**输出：** true

## 示例2

**输入：** 

```js
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
```

**输出：** false

**解释：** 由于位于左上角的`3x3`宫内有两个`8`存在, 因此这个数独是无效的。

## 解析

题目本身并不难，最容易想到的就是按行、列、`3x3`宫格的方式分别查找有没有重复的即可。

但是这样的算法，意味着每个位置上的数字都会被访问3遍，因此效率并不高，实际上还有提升的空间。

在访问每个数字的时候，我们可以借助rowMap，columnMap，boxMap来存储各自维度上已经出现过的数字。这样一旦遇到重复的，就可以直接得到false的结果。

## 代码

```javascript
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
```