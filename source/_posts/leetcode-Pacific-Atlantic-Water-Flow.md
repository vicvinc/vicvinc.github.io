---
title: leetcode-Pacific-Atlantic-Water-Flow
date: 2017-07-14 01:24:56
tags: [leetcode, algorithm, graph-algorithm]
cover: cover.jpg
myexcerpt: 一个图的搜索问题
---
Given an <code>m x n</code> matrix of non-negative integers representing the height of each unit cell in a continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.
Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.
Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.
<b>Note:</b>
* The order of returned grid coordinates does not matter.</li>
* Both <i>m</i> and <i>n</i> are less than 150.</li>
<b>Example:</b>
<pre>Given the following 5x5 matrix:
  Pacific ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic
Return:
[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).</pre>

`背景知识补充`

## 广度搜索(Breadth-First-Search)

广度优先搜索是一个层搜索，先访问根节点，再访问子节点。广度搜索可以说是从图的任何一个节点出发，先访问其子节点，然后在从其中一个子节点开始，进行下一次遍历。因为要保持访问的（层）顺序，所以需要一个队列用来记录当前已经遍历到的节点。

`伪码描述`

1. 任意选取一个节点，放入队列，标记该节点的访问状态为已访问true
2. 如果队列不为空，取队列头为当前节点
3. 如果没有找到可访问的节点，将头节点（当前节点）出队
4. 如果找到其可访问的节点，标记这些可访问节点的访问状态为已访问，然后将头节点（当前节点）出队
5. 重复步骤2，3，4，直到队列为空，则通过该节点的所有节点都已经访问过，返回

结合当前题目的描述：
1. 将左上边界的所有节点入队，标记其访问状态为已访问
2. 循环操作队列，如果队列不为空，取头，然后取该节点可到达的节点（上下左右），计算是否可以访问（ 未访问 && 节点值 <= 可到达节点）
3. 将满足条件的节点入队，将头节点出队，循环2
4. 将右下边界的所有节点入队，重复步骤2
5. 将两次可访问的节点状态求交集

`代码实现`

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

const BFS = (stack, dp, matrix, row, col) => {

  while (stack.length > 0) {
    let tail = stack[stack.length -1]
    let i = tail[0], j = tail[1] // (i, j) => [i, j]

    let top = i - 1, bottom = i + 1, left = j - 1, right = j + 1

    if (top >=0 && !dp[top][j] && matrix[i][j] <= matrix[top][j]) {
      dp[top][j] = true
      stack.pop()
      stack.push([top, j])
      BFS(stack, dp, matrix, row, col)
    }
    
    if (bottom <= row-1 && !dp[bottom][j] && matrix[i][j] <= matrix[bottom][j]) {
      dp[bottom][j] = true
      stack.pop()
      stack.push([bottom, j])
      BFS(stack, dp, matrix, row, col)
    }

    if (left >= 0 && !dp[i][left] && matrix[i][j] <= matrix[i][left]) {
      dp[i][left] = true
      stack.pop()
      stack.push([i, left])
      BFS(stack, dp, matrix, row, col)
    }

    if (right <= col - 1 && !dp[i][right] && matrix[i][j] <= matrix[i][right]) {
      dp[i][right] = true
      stack.pop()
      stack.push([i, right])
      BFS(stack, dp, matrix, row, col)
    }

    stack.pop()
    
  }
}

const pacificAtlantic = function(matrix) {
  let row = matrix.length
  
  if (row === 0) {
      return []
  }

  let col = matrix[0].length
  let dp = new Array(row), dp1 = new Array(row)

  for (let k = 0; k < dp.length; k++) {
    dp[k] = new Array(col)
    dp1[k] = new Array(col)
  }

  let stack = [], stack1 = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i === 0 || j === 0) { 
        dp[i][j] = true // mark to be visited
        stack.push([i, j])
      }
      if ( i === row-1 || j === col -1) {
        dp1[i][j] = true // mark to be visited
        stack1.push([i, j])
      }
    }
  }
  
  BFS(stack, dp, matrix, row, col)    
  BFS(stack1, dp1, matrix, row, col)    

  let rt = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if ((dp[i][j] && dp1[i][j])) {
        rt.push([i, j])
      }
    }
  }
  
  return rt
}

```
### 特点

#### 空间复杂度
因为所有节点都必须被储存，因此BFS的空间复杂度为O(|V| + |E|)，其中|V|是节点的数目，而|E|是图中边的数目。注：另一种说法称BFS的空间复杂度为O(B^M)，其中B是最大分支系数，而M是树的最长路径长度。由于对空间的大量需求，因此BFS并不适合解非常大的问题。

#### 时间复杂度
最差情形下，BFS必须寻找所有到可能节点的所有路径，因此其时间复杂度为O(|V| + |E|)，其中|V|是节点的数目，而|E|是图中边的数目。

#### 完全性
广度优先搜索算法具有完全性。这意指无论图形的种类如何，只要目标存在，则BFS一定会找到。然而，若目标不存在，且图为无限大，则BFS将不收敛（不会结束）。

## 深度优先搜索（Depth-First-Search）

深度优先搜索类似二叉树遍历中的先序遍历，先访问根节点，然后找到跟节点的一个子节点，，标记这个子节点为已访问，然后以这个子节点为起始，再次进行深度搜索。广度搜索需要一个栈来记录之前没有访问完子节点的节点。

`伪码描述`

1. 取一个节点，入栈，标记其状态为已访问
2. 当栈不为空时，取栈尾
3. 如果栈尾的节点没有能继续访问的节点，将其出栈
4. 如果有能继续访问的节点，将栈尾出栈，将下一个访问的节点入栈并标记其访问状态为已访问
5. 转到步骤2直到栈尾空

结合当前题目：

1. 将左上边界的节点入栈，标记其状态为已访问
2. 当栈不为空时，取栈尾
3. 如果以栈尾为起点，没有可以访问的节点，出栈
4. 如果以栈尾为起点，有可以访问的节点，将栈尾出栈，将可访问的节点入栈，并记录其访问状态为已访问
5. 重复步骤2直到栈为空

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

const DFV = (sq, dp, matrix, row, col) => {

  while (sq.length > 0) {
    let head = sq[0]
    let i = sq[0][0], j = sq[0][1] // (i, j) => [i, j]

    let top = i - 1, bottom = i + 1, left = j - 1, right = j + 1
    if (top >=0 && !dp[top][j] && matrix[i][j] <= matrix[top][j]) {
      dp[top][j] = true
      sq.push([top, j])
    }
    
    if (bottom <= row-1 && !dp[bottom][j] && matrix[i][j] <= matrix[bottom][j]) {
      dp[bottom][j] = true
      sq.push([bottom, j])
    }

    if (left >= 0 && !dp[i][left] && matrix[i][j] <= matrix[i][left]) {
      dp[i][left] = true
      sq.push([i, left])
    }

    if (right <= col - 1 && !dp[i][right] && matrix[i][j] <= matrix[i][right]) {
      dp[i][right] = true
      sq.push([i, right])
    }
    sq.shift()
  }

}

var pacificAtlantic = function(matrix) {
  let row = matrix.length
  
  if (row === 0) {
      return []
  }

  let col = matrix[0].length
  let dp = new Array(row), dp1 = new Array(row)

  for (let k = 0; k < dp.length; k++) {
    dp[k] = new Array(col)
    dp1[k] = new Array(col)
  }

  let sq = [], sq1 = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i === 0 || j === 0) { 
        dp[i][j] = true // mark to be visited
        sq.push([i, j])
      }
      if ( i === row-1 || j === col -1) {
        dp1[i][j] = true // mark to be visited
        sq1.push([i, j])
      }
    }
  }
  
  DFV(sq, dp, matrix, row, col)    
  DFV(sq1, dp1, matrix, row, col)    

  let rt = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if ((dp[i][j] && dp1[i][j])) {
        rt.push([i, j])
      }
    }
  }
  return rt
}
```

### 特点

#### 空间复杂度和时间复杂度

因为深度优先搜索也是遍历了所有的节点，所以在时间复杂度上和广度优先搜索是一样的，空间上使用栈代替了队列，空间上的复杂度也是一样的

