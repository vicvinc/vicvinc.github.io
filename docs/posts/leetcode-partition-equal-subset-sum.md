---
title: leetcode-partition-equal-subset-sum
date: 2017-07-04 23:56:25
tags: [leetcode, algorithm]
cover: ./leetcode-partition-equal-subset-sum/cover.jpg
excerpt: leetcode NP问题
---

# leetcode-partition-equal-subset-sum

`Given a non-empty array containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.`

找出一个数组中的和相等两个子数组

首先一个数组可以考虑为一个一维向量，其中两个子向量的和相等

记一维向量的和为 S0，子向量 1 的和为 S1，子向量 2 的和为 S2

从题目要求中可以看到

```javascript
S1 === S2 && S1 + S2 === S0;
// 从而
(S1 === S2) === S0 / 2;
// 又因为输入都是正整数，所以可以判断出如果满足上述条件的一维向量和一定是偶数，即
S0 % 2 === 0;
```

那么解题的思路可以考虑为,从一个数组中选取一个子数组，子数组的和等于该数组和的一半

再次整理问题就可以发现，这是一个从一个集合中选取一个子集，使其和等于一个常数的问题，这个问题也可以变化成求有多少个解的问题（八皇后，骑士环游世界，背包问题，等等）

如果再深挖一点，就可以知道这是一个 NP-C 问题，数学定义：

NP 完全或 NP 完备（NP-Complete，缩写为 NP-C 或 NPC），是计算复杂度理论中，决定性问题的档次之一。
NPC 问题，是 NP（非决定性多项式时间）中最难的决定性问题。
因此 NP 完备问题应该是最不可能被化简为 P（多项式时间可决定）的决定性问题的集合。
若任何 NPC 问题得到多项式时间的解法，那此解法就可应用在所有 NP 问题上。
一个 NPC 问题的例子是子集合加总问题，题目为给予一个有限数量的整数集合，找出任何一个此集合的非空子集且此子集内整数和为零。
这个问题的答案非常容易验证，但目前没有任何一个够快的方法可以在合理的时间内（意即多项式时间）找到答案。只能一个个将它的子集取出来一一测试，
它的时间复杂度是 Ο(2n)，n 是此集合的元素数量。

但是通常这类问题都有两个思路，一个是迭代，一个是递归，首先来说说迭代的思路。

迭代，就是从最基础的解开始，一步一步向目标累计，
比如，求一个数组的子数组，使其和等于 0，通常可以认为空数组的和为 0，所以得解，然后
求一个数组的子数组，使其和等于 1，再然后
求一个数组的子数组，使其和等于 2...
求一个数组的子数组，使其和等于 n

这里可以看到如果对于一个子数组，其和若能能满足 m，则这个子数组的所有子数组都可以满足 m，迭代的复杂度相对于数组的长度 l 和所求值的大小 n
时间复杂度为 l\*n

递归，就是从结果开始，将求解的范围一步一步缩减为求更小范围内的解。

比如，求数组 A 的子数组，使其和等于 N，可以分解为求 A 的子数组 A1，使其和等于 N 减去 A1 相对于 A 的补集 A1’的和 N1
求数组 A1 的子数组，使其和等于 N1，可以进一步分解为求 A1 的子数组 B1，使其和等于 N1 减去 B1 相对于 A1 的补集 B1‘的和 N1’...

递归比较绕，我的想法就是基于递归做的，递归的算法复杂度过高，从算法中可以看出是一个 n！的复杂度，因此提交失败，但是对于小规模的问题，仍然是可以求出解的

在时间超时这个问题上，想了去怎么优化的问题，现在的感觉就是，递归的优化问题，首先考虑迭代！

递归版本:

```javascript
var sum = function(nums) {
  return nums.reduce(function(acc, cur) {
    acc += cur;
    return acc;
  }, 0);
};
// a = > collection
// b => index array
var diff = function(a, b) {
  return a.reduce((acc, cur, cur_index) => {
    if (b.indexOf(cur_index) === -1) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

var canPick = function(a, n) {
  // console.log('===a, n====', a, n)
  if (n < 0) {
    // fail
    return false;
  }
  if (n === 0) {
    // succ
    return true;
  }
  var index_arr = [];
  var rt = [];
  var temp_n = n;

  for (var i = 0, ii = a.length; i < ii; i++) {
    rt.push(a[i]);
    temp_n -= a[i];
    index_arr.push(i);
    if (!canPick(diff(a, index_arr), temp_n)) {
      rt.pop();
      index_arr.pop();
      temp_n += a[i];
    }
  }
  return sum(rt) === n;
};

var canPartition = function(nums) {
  var S = sum(nums);
  if (S % 2 !== 0) {
    return false;
  }

  return canPick(nums, S / 2);
};
```

迭代版本:

```javascript
var canPartition = function(nums) {
  var len = nums.length;
  var S = 0;

  for (var n of nums) S += n;

  if (S % 2 !== 0) return false;

  S /= 2;

  var map = [len];

  for (var i = 0; i < len; i++) {
    map[i] = [S];
    map[i][0] = true;
  }

  //不是很理解为什么小于也可以为true
  if (nums[0] <= S) map[0][nums[0]] = true;

  for (var i = 1; i < len; i++) {
    var num = nums[i];
    // 注意这里一定要取到S，不然就变为求S-1的解了
    for (var j = 1; j <= S; j++) {
      if (num > j) {
        // 变相理解为 j - num < 0,此时的num不应该包含在解的空间中
        map[i][j] = map[i - 1][j];
      } else {
        // 此时可以归为（1-i）的子数组的解
        map[i][j] = map[i - 1][j] | map[i - 1][j - num];
      }
    }
  }

  return !map[len - 1][S] ? false : true;
};
```

## 总结一下：

需要实践的地方：

1. 数组之间的交差并补运算
2. ES6 的数组操作

需要增强的理论：

1. 什么是 P 问题，什么是 NP 问题，什么是 NP 完备（NPC），什么是 NP-Hard
2. 图论和树理论中是否有可以用来解这个问题的理论？
