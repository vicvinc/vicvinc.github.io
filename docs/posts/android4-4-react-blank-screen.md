---
title: android4.4下react inferno白屏的问题
date: 2017-03-15 10:29:36
tags: [react, inferno, android4.4]
heroImage: cover.png
myexcerpt: 安卓手机上使用新的JS特性时遇到的问题
---

# android4.4 js 引擎兼容

react 和 inferno 在安卓 4.4 下白屏的问题，虽然知道可定是 webview 的 js 引擎支撑的 api 有问题，但是 debug 没查出来；google 了一下是 babel 语法转换的问题；

> Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。

> 举例来说，ES6 在 Array 对象上新增了 Array.from 方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill，为当前环境提供一个垫片。

解决方法是安装 babel-polyfill

`$ npm install --save babel-polyfill`

然后在入口文件中添加

`import 'babel-polyfill';`

然后使用 webpack 将 babel-polyfill 增加到 vendor 中，垫片先行。

```javascript
entry: {
    app: './src/index.jsx',
    vendor: ['babel-polyfill', ...]
}
```
