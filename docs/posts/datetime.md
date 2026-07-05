---
title: iOS Safari 日期解析 NaN 问题
date: 2018-05-18 11:33:40
tags: [javascript, ios, bugs]
cover: /posts/datetime/cover.jpg
excerpt: new Date('2018-05-18 11:33:40') 在 iOS 下会得到 Invalid Date——跨端解析的坑。
---

# iOS Safari 日期解析 NaN

## 问题

在 iOS Safari 里：

```javascript
new Date('2018-05-18 11:33:40')
// iOS Safari: Invalid Date（参与运算时为 NaN）
// 桌面 Chrome: 正常解析
```

同样的代码在桌面 Chrome 上一切正常，但到了 iOS Safari 就得到 `Invalid Date`。

## 原因

Safari 的时间解析更严格，不认 `Y-m-d H:i:s`（连字符日期 + 空格分隔时间）这种写法。它更接近 ES5 的 ISO 8601 解析规则——只认以下格式之一：

- `YYYY/MM/DD HH:mm:ss`（斜杠分隔）
- `YYYY-MM-DDTHH:mm:ss`（标准 ISO 8601，用 `T` 分隔）

## 解决方案

```javascript
// ❌ iOS 下得到 Invalid Date / NaN
new Date('2018-05-18 11:33:40')

// ✅ 方案一：换成斜杠分隔
new Date('2018/05/18 11:33:40')

// ✅ 方案二：标准 ISO 8601 格式
new Date('2018-05-18T11:33:40')

// ✅ 方案三：分开传参
new Date(2018, 4, 18, 11, 33, 40) // 注意：月份从 0 开始
```

## 经验法则

凡是要跨端（iOS / Android / 桌面）解析的时间字符串：

1. **优先用 ISO 8601**（`YYYY-MM-DDTHH:mm:ss`），这是标准，所有现代浏览器都支持
2. **后端返回的格式不统一时**，在前端做一层格式化转换
3. **如果用 dayjs / date-fns 等库**，它们的解析已经处理了跨端兼容

这条坑在 WebView / 小程序 / RN 等移动端开发中尤为常见。
