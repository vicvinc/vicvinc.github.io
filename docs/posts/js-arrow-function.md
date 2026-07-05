---
title: ES6 箭头函数与 this 指向
date: 2017-08-07 17:55:14
tags: [javascript, es6]
cover: /posts/js-arrow-function/cover.jpg
excerpt: 箭头函数不绑定自己的 this——这句话比你想的更微妙。
---

# ES6 箭头函数与 this 指向

## 箭头函数基础

箭头函数是 ES6 引入的更简洁的函数写法：

```javascript
// 普通函数
const add = function(a, b) { return a + b; };

// 箭头函数
const add = (a, b) => a + b;

// 单参数可省略括号
const double = x => x * 2;

// 无参数需要空括号
const sayHi = () => console.log('hi');

// 多行需要大括号和 return
const compute = (a, b) => {
  const sum = a + b;
  return sum * 2;
};
```

## 核心：箭头函数不绑定 this

MDN 文档说：

> Arrow functions do not bind their own `this`, `arguments`, `super`, or `new.target`.

意思是：箭头函数内部没有自己的 `this`，它**继承外层词法作用域的 `this`**。

### 普通函数的 this

普通函数的 `this` 在调用时确定，取决于调用方式：

```javascript
var a = 10;

function fn() {
  console.log(this.a);
}

fn();        // 10（this 指向 window/global）

var obj = { a: 20, fn: fn };
obj.fn();    // 20（this 指向 obj）
```

### 箭头函数的 this

箭头函数的 `this` 在定义时就确定了——继承外层作用域的 `this`：

```javascript
var a = 10;

const fn = () => {
  console.log(this.a);
};

fn();        // 10（继承全局作用域的 this → window）

var obj = { a: 20, fn: fn };
obj.fn();    // 10（不受调用方式影响，仍然继承外层 this）
```

### 最常见的应用场景：回调函数

箭头函数解决了回调函数中 `this` 丢失的问题：

```javascript
// ❌ 普通函数的坑
function Timer() {
  this.seconds = 0;
  setInterval(function() {
    this.seconds++;  // this 指向 window，不是 Timer 实例！
  }, 1000);
}

// ✅ 旧做法：保存 this 引用
function Timer() {
  var self = this;
  self.seconds = 0;
  setInterval(function() {
    self.seconds++;  // 通过闭包访问
  }, 1000);
}

// ✅ 箭头函数：自动继承外层 this
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++;  // 继承 Timer 的 this
  }, 1000);
}
```

### 嵌套在普通函数中

```javascript
function Counter() {
  this.count = 0;

  // 普通函数：this 指向调用者
  this.increment = function() {
    // 箭头函数：继承外层 this（即 Counter 实例）
    const inner = () => {
      this.count++;
      console.log(this.count);
    };
    inner();
  };
}

const c = new Counter();
c.increment(); // 1
```

## 箭头函数的注意事项

### 1. 不能作为构造函数

```javascript
const Foo = () => {};
new Foo(); // TypeError: Foo is not a constructor
```

### 2. 没有 arguments 对象

```javascript
const fn = () => {
  console.log(arguments); // ReferenceError
};

// 用剩余参数代替
const fn = (...args) => {
  console.log(args); // ✅
};
```

### 3. 不适合作为对象方法

```javascript
const obj = {
  name: 'Alice',
  // ❌ 不推荐：this 指向外层，不是 obj
  greet: () => {
    console.log(`Hi, ${this.name}`); // this.name 是 undefined
  },

  // ✅ 推荐：用普通函数或简写方法
  greet() {
    console.log(`Hi, ${this.name}`); // 'Hi, Alice'
  }
};
```

## 一句话总结

箭头函数的 `this` 不是在调用时确定的，而是在**定义时**就确定了——它继承的是**词法作用域**（外层代码的 `this`），而不是**调用上下文**。这是箭头函数和普通函数最本质的区别。
