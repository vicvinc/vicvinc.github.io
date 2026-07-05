---
title: Android 4.4 下 React 白屏问题
date: 2017-03-15 10:29:36
tags: [react, babel, android]
cover: /posts/android4-4-react-blank-screen/cover.png
excerpt: Babel 只转语法不转 API——移动端兼容的垫片之痛。
---

# Android 4.4 下 React 白屏

## 问题

React 应用在桌面 Chrome 和新版 Android 上正常运行，但在 Android 4.4 的 WebView 中白屏。

Debug 后发现不是代码逻辑问题，而是 **Babel 的 API 兼容问题**。

## 原因

Babel 默认只转换新的 JavaScript **句法**（syntax），而不转换新的 **API**。

比如这些全局对象和方法，Babel 不会帮你转码：

- `Promise`
- `Set` / `Map`
- `Iterator` / `Generator`
- `Proxy` / `Reflect`
- `Symbol`
- `Array.from` / `Array.of`
- `Object.assign`
- `String.includes` / `String.padStart`

Android 4.4 的 WebView 基于旧的 V8 引擎，不支持这些 ES6+ API。代码里用了 `Promise` 或 `Object.assign`，运行时就直接报错——白屏。

> 这就好比你买了一本翻译版的日式菜谱，翻译把日语语法翻成了中文，但食材清单里还是写着「大根」「万能葱」——你拿着中文语法还是买不到东西。

## 解决方案

### 方案一：babel-polyfill（2017 年的做法）

```bash
npm install --save babel-polyfill
```

在入口文件顶部引入：

```javascript
import 'babel-polyfill';
```

或者配置 webpack 把 polyfill 放到 vendor 最前面：

```javascript
entry: {
  app: './src/index.jsx',
  vendor: ['babel-polyfill', 'react', 'react-dom']
}
```

### 方案二：core-js + regenerator（现代做法）

Babel 7+ 推荐用 `@babel/preset-env` + `core-js` 替代已废弃的 `babel-polyfill`：

```javascript
// .babelrc / babel.config.js
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",  // 按需引入，只打包你用到的 API
      "corejs": 3
    }]
  ]
}
```

`useBuiltIns: "usage"` 是关键——它会扫描代码中实际用到的 ES6+ API，只引入对应的 polyfill，大大减少打包体积。

## 现状

Android 4.4 已经基本退出历史舞台（截至 2024 年全球占比 < 0.5%），但这个教训仍然有价值：

1. **语法和 API 是两回事**——Babel 负责前者，polyfill 负责后者
2. **浏览器兼容性不只是 CSS 前缀**——JS 运行时的 API 差异同样致命
3. **按需引入优于全量打包**——现代工具链已经很好地解决了这个问题
