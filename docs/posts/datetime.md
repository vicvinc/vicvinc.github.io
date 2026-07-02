---
title: iOS datetime NaN
date: 2018-05-18 11:33:40
tags: bugs
excerpt: iOS Safari 解析时间字符串的坑，Y-m-d H:i:s 会得到 NaN，改用斜杠或标准 ISO 8601。
---

# iOS datetime NaN

在 iOS Safari 里用 `new Date('2018-05-18 11:33:40')` 会得到 `Invalid Date`（参与运算时就是 `NaN`），而同样的代码在桌面 Chrome 上却一切正常。

原因是 Safari 的时间解析更严格，它不认 `Y-m-d H:i:s`（空格分隔、连字符日期）这种写法，而是更接近 ES5 的 ISO 8601 解析规则。所以遇到非标准格式时直接返回 `Invalid Date`。

## 解决办法

把分隔符换成斜杠，使用 `Y/m/d H:i:s`：

```javascript
// ❌ iOS 下得到 Invalid Date / NaN
new Date('2018-05-18 11:33:40')
// ✅ iOS / Android 通用
new Date('2018/05/18 11:33:40')
```

或者直接给出标准的 ISO 8601 格式，用 `T` 分隔日期与时间：

```javascript
new Date('2018-05-18T11:33:40')
```

## 小结

凡是要跨端解析的时间字符串，优先用 `YYYY/MM/DD HH:mm:ss` 或标准 ISO 8601（`YYYY-MM-DDTHH:mm:ss`），可以避免在 iOS 等 WebView 里出现 `NaN`。
