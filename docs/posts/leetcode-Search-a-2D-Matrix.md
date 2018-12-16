---
title: Search-a-2D-Matrix
date: 2017-07-05 20:14:35
tags: [leetcode, algorithm]
cover: ./leetcode-Search-a-2D-Matrix/cover.jpg
excerpt: leetcode 二叉搜索问题
---

> Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.
  > For example,

> Consider the following matrix:

> [
> [1, 3, 5, 7],
> [10, 11, 16, 20],
> [23, 30, 34, 50]
> ]
> Given target = 3, return true.

题目很简单，在一个有序的二维数组里面查找一个值，考察的应该是二叉查找，但是我首先想到的是一个偷懒的写法

```javascript
var searchMatrix = function(matrix, target) {
  var mLen = matrix.length;
  if (mLen === 0) {
    return false;
  }

  var total = [];
  for (var i = 0; i < mLen; i++) {
    total = total.concat(matrix[i]);
  }
  return total.indexOf(target) > -1 ? true : false;
};
```

这样提交可以通过…但是，很显然，这是一个投机取巧的办法，因为没有实现查找算法

实现一个二叉树查找

```javascript
// find n in array a
const searchArray = (a, n) => {
  let len = a.length;
  if (len === 0) {
    return false;
  }

  if (a[0] > n || a[len - 1] < n) {
    return false;
  }
  if (len === 1) {
    return a[0] === n;
  } else {
    let mid = Math.ceil(len / 2);
    let left = a.slice(0, mid);
    let right = a.slice(mid, len);
    return searchArray(left, n) || searchArray(right, n);
  }
};

const searchMatrix = (m, t) => {
  var mLen = m.length;
  if (mLen === 0) {
    return false;
  }

  var total = [];
  for (var i = 0; i < mLen; i++) {
    total = total.concat(m[i]);
  }
  return searchArray(total, t);
};
```

对二维数组的话，可以再来了二叉树查找

```javascript
const searchArray = (a, n) => {
  let len = a.length;
  if (len === 0) {
    return false;
  }

  if (a[0] > n || a[len - 1] < n) {
    return false;
  }
  if (len === 1) {
    return a[0] === n;
  } else {
    let mid = Math.ceil(len / 2);
    let left = a.slice(0, mid);
    let right = a.slice(mid, len);
    return searchArray(left, n) || searchArray(right, n);
  }
};

const searchMatrix = (a, n) => {
  let len = a.length;
  if (len === 0) {
    return false;
  }
  if (len === 1) {
    return searchArray(a[0], n);
  } else {
    let head = a[0];
    let tail = a[len - 1];
    if (head[0] > n || tail[tail.length - 1] < n) {
      return false;
    }
    let mid = Math.ceil(len / 2);
    let left = a.slice(0, mid);
    let right = a.slice(mid, len);
    return searchMatrix(left, n) || searchMatrix(right, n);
  }
};
```

但是三个算法的时间,尽然是投机取巧的最快。。。

![ShowImage](/time.png)
