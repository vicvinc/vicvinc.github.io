---
title: CSS 基础概念回顾
date: 2017-03-20 22:39:43
tags: css
cover: /posts/learn-css-review/cover.jpg
excerpt: CSS 盒模型、层叠、定位、BFC——这些概念是布局的根基。
---

# CSS 核心概念梳理

![cover](./learn-css-review/cover.jpg)

## 1. 盒模型

每个元素都是一个矩形盒子，从内到外依次是：

```
┌──────────────── margin ────────────────┐
│  ┌──────────── border ────────────────┐ │
│  │  ┌──────── padding ──────────────┐ │ │
│  │  │  ┌──────── content ─────────┐ │ │ │
│  │  │  │       width × height     │ │ │ │
│  │  │  └──────────────────────────┘ │ │ │
│  │  └────────────────────────────────┘ │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

- **content**: `width` × `height`
- **padding**: 内边距，背景色会延伸到此区域
- **border**: 边框
- **margin**: 外边距，透明

### margin 折叠

相邻的垂直外边距会合并（折叠），规则：

- 都是正值：取较大的
- 一正一负：相加
- 都是负值：取绝对值较小的（即更接近 0 的）

折叠条件：
- 两个 margin 之间没有被非空内容、padding、border 或 clear 分隔
- 都处于普通流中（非浮动、非绝对定位）

**注意**：创建了 BFC 的元素不和子元素发生 margin 折叠。

## 2. 选择器优先级（层叠顺序）

CSS 用 `(a, b, c, d)` 四元组比较优先级：

| 级别 | 选择器类型 | 权重 |
|------|-----------|------|
| a | `!important` / 内联样式 `style=""` | 最高 |
| b | ID 选择器 `#id` | +1 |
| c | 类 `.class`、伪类 `:hover`、属性 `[type=text]` | +1 |
| d | 元素 `div`、伪元素 `::before` | +1 |

比较规则：从左到右逐位比较，`(1,0,0,0) > (0,9,9,9)`。

```css
/* (0,0,0,1) */
p { color: blue; }

/* (0,0,1,0) */
.text { color: red; }

/* (0,1,0,0) */
#title { color: green; }

/* (1,0,0,0) — 内联 */
<p style="color: black;">
```

## 3. position 定位

| 值 | 脱离文档流 | 参考定位 | 特点 |
|------|-----------|---------|------|
| `static` | 否 | — | 默认值，服从普通流 |
| `relative` | 否 | 自身原位置 | 偏移不影响后续元素布局 |
| `absolute` | 是 | 最近的非 static 祖先 | 完全脱离普通流 |
| `fixed` | 是 | 视口（viewport） | 不随滚动条移动 |
| `sticky` | 否 | 滚动容器的阈值 | 滚动到阈值前是 relative，到达后变 fixed |

**注意**：`absolute` 和 `fixed` 元素的 `float` 计算值为 `none`。

## 4. BFC 和 IFC

### BFC（Block Formatting Context，块级格式化上下文）

BFC 是一个独立的渲染区域，内部元素的布局不影响外部。

**触发条件**（任一即可）：
- `float` 不为 `none`
- `position` 为 `absolute` 或 `fixed`
- `display` 为 `inline-block`、`flex`、`grid`、`table-cell`、`flow-root`
- `overflow` 不为 `visible`

**BFC 的作用**：
1. **清除浮动**：BFC 会包含浮动的子元素（父元素塌陷问题）
2. **避免 margin 折叠**：BFC 内部和外部的 margin 不会折叠
3. **不被浮动覆盖**：BFC 区域不会与浮动元素重叠

> `display: flow-root` 是 CSS3 新增的专门用于创建 BFC 的值，没有副作用（不影响 display 类型）。

### IFC（Inline Formatting Context，行内格式化上下文）

行内元素在 IFC 中水平排列，垂直对齐遵循 `vertical-align`。

## 5. 包含块（Containing Block）

包含块决定了元素的定位和百分比尺寸的参考。

| 定位方式 | 包含块 |
|---------|--------|
| `static` / `relative` | 最近的块级、`table-cell` 或 `inline-block` 祖先的**内容框** |
| `absolute` | 最近的 `position` 非 `static` 的祖先的 **padding box** |
| `fixed` | 视口（viewport） |
| `float` | 最近的块级祖先元素 |

**实用技巧**：需要基于内容而非视窗固定时，可以用 `position: absolute` 配合一个 `position: relative` 的滚动容器来实现。
