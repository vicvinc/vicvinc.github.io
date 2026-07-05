---
title: LeetCode 74 - Search a 2D Matrix
date: 2017-07-05 20:14:35
tags: [leetcode, algorithm, binary-search]
cover: /posts/leetcode-Search-a-2D-Matrix/cover.jpg
excerpt: 有序矩阵中的二分查找——从暴力到最优的思路演进。
---

## 题目

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.

例如：

```
[
  [1,  3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
给定 target = 3，返回 true。
```

## 分析

矩阵每行有序，且每行首元素大于上一行末元素——如果把这个二维矩阵"展平"成一维，就是一个有序数组。在有序数组中查找一个值，自然想到**二分查找**。

关键在于如何在二维矩阵上做二分：
- 把一维索引 `mid` 映射回二维坐标：`row = Math.floor(mid / n)`，`col = mid % n`
- 这样不需要真正展平，直接在原矩阵上操作

## 解法一：展平 + indexOf（投机取巧）

```javascript
var searchMatrix = function(matrix, target) {
  var mLen = matrix.length;
  if (mLen === 0) return false;

  var total = [];
  for (var i = 0; i < mLen; i++) {
    total = total.concat(matrix[i]);
  }
  return total.indexOf(target) > -1;
};
```

能通过，但时间复杂度 O(m×n)，没有利用矩阵有序的性质。面试中这不是期望的解法。

## 解法二：一维二分查找

把矩阵视为长度为 `m × n` 的有序数组，直接做二分：

```javascript
var searchMatrix = function(matrix, target) {
  var m = matrix.length;
  if (m === 0) return false;
  var n = matrix[0].length;

  var left = 0, right = m * n - 1;

  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    var row = Math.floor(mid / n);
    var col = mid % n;
    var val = matrix[row][col];

    if (val === target) return true;
    if (val < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
};
```

**时间复杂度**：O(log(m×n))，标准的二分查找。
**空间复杂度**：O(1)。

## 解法三：两次二分（先找行再找列）

也可以分两步：
1. 先在第一列上二分，找到 target 可能出现在哪一行
2. 再在该行上二分查找 target

```javascript
var searchMatrix = function(matrix, target) {
  var m = matrix.length;
  if (m === 0) return false;
  var n = matrix[0].length;

  // 先二分找行：找到最后一行首元素 <= target 的行
  var lo = 0, hi = m - 1;
  while (lo < hi) {
    var mid = Math.ceil((lo + hi) / 2);
    if (matrix[mid][0] <= target) lo = mid;
    else hi = mid - 1;
  }

  // 在该行中二分查找
  var row = matrix[lo];
  var l = 0, r = n - 1;
  while (l <= r) {
    var mid = Math.floor((l + r) / 2);
    if (row[mid] === target) return true;
    if (row[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  return false;
};
```

**时间复杂度**：O(log m + log n) = O(log(m×n))，与解法二相同。

## 小结

| 解法 | 时间 | 空间 | 备注 |
|------|------|------|------|
| 展平 + indexOf | O(m×n) | O(m×n) | 暴力，不推荐 |
| 一维二分 | O(log(m×n)) | O(1) | 最优 |
| 两次二分 | O(log m + log n) | O(1) | 同样最优，思路更直观 |

这道题的核心就是：**识别出有序结构，然后用二分查找。** 展平的思路虽对，但没有利用有序性，失去了这道题考察的意义。
