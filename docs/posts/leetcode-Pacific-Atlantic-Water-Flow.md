---
title: LeetCode 417 - Pacific Atlantic Water Flow
date: 2017-07-14 01:24:56
tags: [leetcode, algorithm, graph-algorithm]
cover: /posts/leetcode-Pacific-Atlantic-Water-Flow/cover.jpg
excerpt: 逆向思维——从海洋出发的 BFS/DFS 图搜索。
---

## 题目

Given an `m x n` matrix of non-negative integers representing the height of each unit cell in a continent. The "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges. Water can only flow from a cell to another one with height equal or lower. Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

```
  Pacific ~   ~   ~   ~   ~
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic
Return: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

## 分析

直觉思路是对每个格子做 BFS/DFS，看能不能同时到达两个大洋。但这样每个格子都要遍历整个矩阵，时间复杂度 O(m×n×(m+n))。

**更好的思路是逆向思维——从大洋出发。**

水从高处流向低处，反过来就是：从大洋边界出发，可以"逆流"到达哪些格子？逆流的条件是：相邻格子的高度 **大于等于** 当前格子。

- 从 Pacific 边界（第一行 + 第一列）出发，标记所有能到达的格子
- 从 Atlantic 边界（最后一行 + 最后一列）出发，标记所有能到达的格子
- 两个标记的**交集**就是答案

## 解法：BFS

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function(matrix) {
  if (!matrix || matrix.length === 0) return [];

  const m = matrix.length, n = matrix[0].length;

  // BFS 从给定边界出发，标记所有可达格子
  const bfs = (queue) => {
    const reachable = new Set();
    while (queue.length > 0) {
      const [r, c] = queue.shift();
      const key = `${r},${c}`;
      if (reachable.has(key)) continue;
      reachable.add(key);

      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
        if (matrix[nr][nc] < matrix[r][c]) continue; // 逆流：高度必须 >=
        queue.push([nr, nc]);
      }
    }
    return reachable;
  };

  // Pacific 边界：第一行 + 第一列
  const pQueue = [];
  for (let i = 0; i < m; i++) pQueue.push([i, 0]);
  for (let j = 0; j < n; j++) pQueue.push([0, j]);

  // Atlantic 边界：最后一行 + 最后一列
  const aQueue = [];
  for (let i = 0; i < m; i++) pQueue.push([i, n - 1]);
  for (let j = 0; j < n; j++) pQueue.push([m - 1, j]);

  const pacific = bfs(pQueue);
  const atlantic = bfs(aQueue);

  // 求交集
  const result = [];
  for (const key of pacific) {
    if (atlantic.has(key)) {
      const [r, c] = key.split(',').map(Number);
      result.push([r, c]);
    }
  }
  return result;
};
```

### DFS 版本

也可以用 DFS，思路完全一样：

```javascript
var pacificAtlantic = function(matrix) {
  if (!matrix || matrix.length === 0) return [];

  const m = matrix.length, n = matrix[0].length;
  const pacific = Array.from({ length: m }, () => new Array(n).fill(false));
  const atlantic = Array.from({ length: m }, () => new Array(n).fill(false));

  const dfs = (r, c, visited) => {
    visited[r][c] = true;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
      if (visited[nr][nc]) continue;
      if (matrix[nr][nc] < matrix[r][c]) continue;
      dfs(nr, nc, visited);
    }
  };

  // 从 Pacific 边界出发
  for (let i = 0; i < m; i++) dfs(i, 0, pacific);
  for (let j = 0; j < n; j++) dfs(0, j, pacific);

  // 从 Atlantic 边界出发
  for (let i = 0; i < m; i++) dfs(i, n - 1, atlantic);
  for (let j = 0; j < n; j++) dfs(m - 1, j, atlantic);

  // 求交集
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }
  return result;
};
```

## 复杂度

| | BFS | DFS |
|---|---|---|
| 时间 | O(m × n) | O(m × n) |
| 空间 | O(m × n) | O(m × n) |

每个格子最多被访问常数次（两个大洋各一次）。

## 小结

这道题的核心是**逆向思维**：与其对每个格子问"能不能流到大海"，不如从大海问"能逆流到哪些格子"。把 O(m×n×(m+n)) 降到了 O(m×n)。

这种"从结果反推来源"的思路在很多图搜索问题中都适用——比如迷宫求出口、单词搜索等。
