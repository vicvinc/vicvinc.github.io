---
title: LeetCode 416 - Partition Equal Subset Sum
date: 2017-07-04 23:56:25
tags: [leetcode, algorithm, dynamic-programming]
cover: /posts/leetcode-partition-equal-subset-sum/cover.jpg
excerpt: 从 NP-C 问题到动态规划——等和子集划分的思路演进。
---

## 题目

Given a non-empty array containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

例如：`[1, 5, 11, 5]` 可以划分为 `[1, 5, 5]` 和 `[11]`，和都是 11。

## 分析

### 问题转化

两个子集和相等，意味着：

```
S1 === S2 且 S1 + S2 === S0（数组总和）
⟹ S1 === S2 === S0 / 2
```

所以问题转化为：**能否从数组中选取若干元素，使其和恰好等于 S0/2？**

这是经典的**子集和问题（Subset Sum）**，属于 NP-C 问题。

### NP-C 是什么

NP-Complete 问题有两层含义：
1. **解可以在多项式时间内验证**（给一个子集，加一下就知道和是否等于目标值）
2. **目前没有多项式时间的解法**（只能枚举，最坏 O(2ⁿ)）

但本题有一个重要条件——**所有输入都是正整数**，且目标值 S0/2 是一个具体的数。这意味着可以用**动态规划**在伪多项式时间内求解。

## 解法一：递归（暴力回溯）

```javascript
var canPartition = function(nums) {
  const S = nums.reduce((a, b) => a + b, 0);
  if (S % 2 !== 0) return false;

  const target = S / 2;

  const tryPick = (index, remaining) => {
    if (remaining === 0) return true;
    if (remaining < 0 || index >= nums.length) return false;

    // 选或不选
    return tryPick(index + 1, remaining - nums[index]) ||
           tryPick(index + 1, remaining);
  };

  return tryPick(0, target);
};
```

**时间复杂度**：O(2ⁿ)，会超时。

## 解法二：动态规划（0-1 背包）

这是经典的 0-1 背包变形：背包容量为 `target = S0/2`，每个物品只能选或不选，问能否恰好装满。

定义 `dp[j]` 表示"能否选出若干元素使和为 j"，转移方程：

```
dp[j] = dp[j] || dp[j - nums[i]]
```

```javascript
var canPartition = function(nums) {
  const S = nums.reduce((a, b) => a + b, 0);
  if (S % 2 !== 0) return false;

  const target = S / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // 和为 0 一定可行（空集）

  for (const num of nums) {
    // 从大到小遍历，避免同一物品被选多次
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
};
```

**时间复杂度**：O(n × target)，其中 target = S0/2。
**空间复杂度**：O(target)，一维 DP。

### 为什么从大到小遍历？

这是 0-1 背包的关键技巧。如果从小到大遍历，`dp[j - num]` 可能已经在当前轮更新过，导致同一个物品被"选了多次"（变成完全背包）。从大到小遍历保证 `dp[j - num]` 用的还是上一轮的值。

## 小结

| 解法 | 时间 | 空间 | 适用场景 |
|------|------|------|---------|
| 递归 | O(2ⁿ) | O(n) | 数据量极小 |
| 记忆化递归 | O(n × target) | O(n × target) | 思路直观 |
| 一维 DP | O(n × target) | O(target) | 最优解 |

这道题的核心是**识别出 0-1 背包模型**——一旦看出来，套用模板就行。NP-C 不可怕，只要输入规模有限，动态规划就能在合理时间内解决。
