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
console.log(ret); // 7 0 8