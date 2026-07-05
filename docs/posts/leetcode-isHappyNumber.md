---
title: LeetCode 202 - Happy Number
date: 2017-07-07 01:17:06
tags: [leetcode, algorithm, math]
cover: /posts/leetcode-isHappyNumber/cover.png
excerpt: 数学规律的发现——从暴力枚举到周期检测的思路演进。
---

## 题目

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

例如：19 是一个 happy number：

```
1² + 9² = 82
8² + 2² = 68
6² + 8² = 100
1² + 0² + 0² = 1
```

## 分析

这道题的关键不在于怎么算平方和，而在于**怎么判断不会终止**。

不断重复"各位平方求和"这个过程，只有两种结局：
1. 最终到 1（happy number）
2. 陷入一个不包含 1 的循环（unhappy number）

所以问题转化为：**如何检测循环？**

## 思路一：找规律

先用暴力法跑一遍，看看哪些数会陷入循环：

```javascript
let cycleNumbers = [];
for (let num = 0; num < 1000; num++) {
  let visited = [];
  let cur = num;
  while (true) {
    let sum = String(cur)
      .split('')
      .reduce((acc, d) => acc + d * d, 0);

    if (!visited[sum]) {
      visited[sum] = true;
    } else {
      cycleNumbers[sum] = true;
      break;
    }

    if (sum === 1) break;
    cur = sum;
  }
}
```

1000 以内会"循环到自己"的数有：

```
0, 1, 4, 16, 20, 37, 42, 58, 89, 145
```

仔细观察发现，除了 0 和 1，其余的数构成了一个循环链：

```
4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4
```

也就是说：所有 unhappy number 最终都会落到这个循环里。而 happy number 最终都会到 1。

所以只要检测过程中**是否出现 4**（或任何循环链中的数），就能判断：

```javascript
var isHappy = function(n) {
  let num = n;
  while (true) {
    let sum = String(num)
      .split('')
      .reduce((acc, d) => acc + d * d, 0);

    if (sum === 1) return true;
    if (sum === 4) return false;
    num = sum;
  }
};
```

**时间复杂度**：O(log n) 每次迭代，总迭代次数有限（最多几十次）。
**空间复杂度**：O(1)。

## 思路二：快慢指针（通用循环检测）

上面的"4"是经验规律，不够通用。更优雅的方法是用**快慢指针**（Floyd 判圈法）——和检测链表环一样：

```javascript
var isHappy = function(n) {
  const digitSquareSum = (num) => {
    let sum = 0;
    while (num > 0) {
      const d = num % 10;
      sum += d * d;
      num = Math.floor(num / 10);
    }
    return sum;
  };

  let slow = n;
  let fast = n;

  do {
    slow = digitSquareSum(slow);        // 走一步
    fast = digitSquareSum(digitSquareSum(fast)); // 走两步
  } while (slow !== fast);

  return slow === 1;
};
```

如果 fast 追上了 slow，说明有环。环的入口是 1（happy）还是其他值（unhappy）一目了然。

**时间复杂度**：O(log n)。
**空间复杂度**：O(1)，不需要额外数组。

## 小结

| 解法 | 思路 | 通用性 |
|------|------|--------|
| 固定数值检测 | 预跑发现循环链，检测是否碰到 4 | 仅适用本题 |
| HashSet | 记录所有访问过的数，重复即循环 | 通用，空间 O(log n) |
| 快慢指针 | Floyd 判圈法 | 通用，空间 O(1) |

这道题的本质是**循环检测**——一个经典的算法问题。数字平方和只是表象。
