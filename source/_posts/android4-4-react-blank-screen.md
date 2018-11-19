---
title: android4.4下react inferno白屏的问题
date: 2017-03-15 10:29:36
tags: [react, inferno, android4.4]
cover: cover.png
myexcerpt: 安卓手机上使用新的JS特性时遇到的问题
---
# android4.4 js引擎兼容

react 和 inferno 在安卓4.4下白屏的问题，虽然知道可定是webview的js引擎支撑的api有问题，但是debug没查出来；google了一下是babel语法转换的问题；

>Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

>举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

解决方法是安装babel-polyfill

`$ npm install --save babel-polyfill`

然后在入口文件中添加

`import 'babel-polyfill';`

然后使用webpack将babel-polyfill增加到vendor中，垫片先行。

```javascript
entry: {
    app: './src/index.jsx',
    vendor: ['babel-polyfill', ...]
}
```