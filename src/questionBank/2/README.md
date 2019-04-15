---
title: 2.两数相加
difficulty: 中等
related: 链表|数学
---

## 题目

给出两个`非空`的链表用来表示两个非负的整数。其中，它们各自的位数是按照`逆序`的方式存储的，并且它们的每个节点只能存储`一位`数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字`0`之外，这两个数都不会以`0`开头。

## 示例

**输入：** (2 -> 4 -> 3) + (5 -> 6 -> 4)

**输出：** 7 -> 0 -> 8

**原因：** 342 + 465 = 807

## 解析

水题，很基本的链表操作问题。

需要注意的就是要考虑到`链表长度不相同`和`加法产生进位`的情况，防止程序出错。

由于只要遍历一遍即可，所以假设两个list的长度分别是m和n，那么时间复杂度是`O(max(m, n))`；存储新链表需要空间，空间复杂度也是`O(max(m, n))`。

## 代码

```javascript
/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  
  // 非法值处理
  if(!l1) return l2;
  if(!l2) return l1;
  
  // 两个列表同时向前走即可
  // 这里要注意可能最后两个数想加会产生进位，所以循环判断的时候要考虑进位
  var tmpRet = Helper.calc(l1, l2);
  var l = new ListNode(tmpRet.val), tmpNode = l;
  while(
    (l1 && l1.next) ||
    (l2 && l2.next) ||
    tmpRet.carryNum
  ) {
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
    tmpRet = Helper.calc(l1, l2, tmpRet.carryNum);
    tmpNode.next = new ListNode(tmpRet.val);
    tmpNode = tmpNode.next;
  }
  
  return l;
};

var Helper = {
  calc(node1, node2, carryNum = 0) {
    var val1 = (node1 && node1.val) || 0;
    var val2 = (node2 && node2.val) || 0;
    var sum = val1 + val2 + carryNum;
    return {
      val: sum % 10,                  // 值
      carryNum: Math.floor(sum / 10)  // 进位
    };
  }
}

// testing code
const createList = (arr = []) => arr.reduceRight(
  (prev, cur) => ({val: cur, next: prev}),
  null
)
const l1 = createList([2, 4, 3]);
const l2 = createList([5, 6, 4]);
const ret = addTwoNumbers(l1, l2);
console.log(ret);     // 相当于createList([7, 0, 8])
```