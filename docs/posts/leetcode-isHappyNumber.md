---
title: isHappyNumber
date: 2017-07-07 01:17:06
tags: [leetcode, algorithm]
cover: ./leetcode-isHappyNumber/cover.png
excerpt: leetcode 数学问题
---

`A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.`
`Example: 19 is a happy number`
`12 + 92 = 82`
`82 + 22 = 68`
`62 + 82 = 100`
`12 + 02 + 02 = 1`

最朴素的想法是拿到一个数，然后去求各个数位上的平方和，继续迭代，如果得到 1 则返回 t，不为 1 则 f

首先这个计算会陷入循环，即一个数从开始计算到陷入循环，然后就是一直循环，由此可以推导出

1. 只要经过循环中个一个节点，则会遍历到这个循环里面的所有节点
2. 1 只能循环到自己，也就是说 1 是循环到自己的最小环

首先使用一个迭代的算法可以看一下 1000 以内能够通过这个算法循环到自己的数：

```javascript
// 记录会陷入循环的数
let b = [];
for (let num = 0; num < 1000; num++) {
  let a = [];
  let cur = num;
  while (1) {
    // 转换为字符串方便取值
    let nStr = cur + "";
    let sum = 0;
    // 求和
    for (let i = 0; i < nStr.length; i++) {
      let n = parseInt(nStr[i]);
      sum += n * n;
    }
    // 没陷入训话
    if (!a[sum]) {
      a[sum] = true;
      // 陷入循环
    } else {
      b[sum] = true;
      break;
    }
    // 进行下一次运算
    cur = sum;
  }
}

b.map((e, index) => {
  if (e) {
    console.log(index);
  }
});
```

得到如下结果：

```bash
0
1
4
16
20
37
42
58
89
145
```

也就是说，1000 以内有这么几个数，可以通过求各个数位上的平方和一直计算到自己，其中 1 是距离最短的，经过一次就可以计算到自己，排除 0
也就是说，如果用上述的算法，只有这几个数会让代码陷入死循环，仔细看一下这几个数会发现

```mathlab
4 = 4*4 = 16
20 = 4 + 0 = 4
16 = 1 + 36 = 37
37 = 9 + 49 = 58
42 = 16 + 4 = 20
58 = 25 + 64 = 89
89 = 64 + 81 = 145
145 = 1 + 16 + 25 = 42
```

也就是说这几个数也是在自己的循环里面！大胆推测应该存在三个环可以通过上述的算法最后循环到自己，0, 1, 4 这三个基数所构成的环，再研究一下就可以发现其他的环都会落到 4 的环和 1 的环！

所以修改一下上述算法，使其陷入循环的时候去判断，如果是 1 的环返回 t，如果是 4 的环返回 f

```javascript
var isHappy = function(n) {
  let number = n;
  while (1) {
    let nStr = number + "";
    let sum = 0;
    for (let i = 0; i < nStr.length; i++) {
      let n = parseInt(nStr[i]);
      sum += n * n;
    }
    if (sum == 1) {
      return true;
    } else if (sum === 4) {
      return false;
    }
    number = sum;
  }
};
```
