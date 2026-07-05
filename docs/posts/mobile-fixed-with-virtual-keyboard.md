---
title: 移动端 fixed 布局与软键盘的冲突
date: 2018-11-20 09:00:00
tags: [css, mobile, 修复]
cover: /posts/init/cover.png
excerpt: 软键盘弹起导致 fixed 元素错位——一个移动端表单的经典坑。
---

# 移动端 fixed 布局与软键盘

## 问题

在移动端的 dialog 或 popup 中填写表单时，软键盘弹起会让视窗（viewport）向上滚动。当输入结束、软键盘消失后，视窗没有自动滚回原位——**渲染看起来正常，但点击区域已经错位了**。

你看到的按钮在 A 位置，但实际可点击的区域已经偏移到了 B 位置。

## 原因

iOS Safari（以及部分 Android WebView）在软键盘弹起时：

1. 视窗向上滚动，给键盘让出空间
2. 键盘消失后，**视觉上**的渲染恢复了（CSS 布局重新计算）
3. 但**实际的可点击坐标**没有同步更新——还存在一个滚动偏移量

这就是为什么 fixed 定位的元素在键盘交互后变得"看起来对但点不准"。

## 解决方案

### 临时修复：输入结束后滚动归位

```javascript
inputElement.addEventListener('blur', () => {
  window.scrollTo(0, 0);
});
```

这个方案简单粗暴，在大多数场景下有效。

### 更好的实践：避免在 fixed 区域放表单

从设计层面规避：

- **fixed / sticky 区域**只用于展示性内容（通知条、操作按钮）
- 需要输入的表单放在**普通文档流**中，或者用全屏弹层承载
- 如果必须在 fixed 区域输入，**一定要在真机上测试**

### 现代方案：使用 visualViewport API

```javascript
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    // 根据可视区域的变化调整布局
  });
}
```

## 经验总结

移动端 fixed 定位与软键盘的冲突是一个经典的兼容性问题，核心原因是浏览器对视窗管理的处理不一致。最佳策略是**从设计上规避**——不要在 fixed 区域做复杂交互。
