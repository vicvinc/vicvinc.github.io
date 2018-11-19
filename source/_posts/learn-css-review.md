---
title: learn_css_review
date: 2017-03-20 22:39:43
tags: css
cover: cover.jpg
myexcerpt: CSS中的一些标准概念
---
# css的一些理论简要
## 1.框模型：
外边框：TM, LM , RM, BM
border框: TB, LB, RB, BB
内边框: TP, LP, RP, BP
内容框: width, height

外边框毗邻会出现折叠，折叠计算一起计算，正值取绝对值较大的，正负相加，负值取绝对值较小的
折叠产生的条件：
-1.这两个或多个外边距没有被非空内容、padding、border 或 clear 分隔开。
-2.这些 margin 都处于普通流中
注意点：
-1.创建了块级格式化上下文的元素，不和它的子元素发生 margin 折叠
-2.元素自身的 margin-bottom 和 margin-top 相邻时也会折叠
-3.浮动元素、inline-block 元素、绝对定位元素的 margin 不会和垂直方向上其他元素的 margin 折叠（这里的inline-block元素属于创建了块级格式化上下文的元素？）

## 2.CSS选择器层叠值（层叠顺序）：
a.内联样式权重+1
b.id样式权重+1
c.class和伪类权重1
d.元素（tag）选择器权重1
偏序比较（a1, b1, c1, d1） > < = (a2, b2, c2, d2),取较大的值，相等则覆盖

## 3.position定位概述：
static默认值
relative（相对定位）
inherit继承父元素（不是包含块）
float（浮动）
absolute（绝对定位）
fixed（绝对定位）相对于viewport，即包含块为UA的viewport

static和relative的元素服从普通流的布局，top,left,right,bottom不会影响后续元素的布局，height和width会影响

float和absolute的元素会脱离普通流，不会影响后续元素的布局，position为absolute和fixed时，float为none；
float和absolute的元素定位相对于包含块，absolute的包含块为第一个不为static的祖先，float为第一个块级祖先元素

float脱离普通流，然后在包含块的范围内进行浮动，absolute和fixed元素的float计算后为none

浮动和绝对定位的元素计算后只有block和table

## 4.BFC和IFC
BFC => block formating context 块级格式化上下文，是指在元素布局在其包含块的范围内，按照自己的定位方式来布局
IFC => inline formating context 行内格式化上下文，是指元素布局在行内包含块的范围内，按照定义的方式来布局

## 5.包含块的计算

1.根元素
根元素，就是处于文档树最顶端的元素，它没有父节点。
根元素存在的包含块，被叫做初始包含块 (initial containing block)。具体，跟用户端有关。
在 (X)HTML 中，根元素是 html 元 素（尽管有的浏览器会不正确地使用 body 元素）。
而初始包含块的 direction 属性与根元素相同。

2.静态定位元素和相对定位元素
如果该元素的定位（position）为 "relative" （相对定位）或者 "static"（静态定位），它的包含块由它最近的块级、单元格（table cell）或者行内块（inline-block）祖先元素的 内容框创建。
元素如果未声明 'position' 特性，那么就会采用 'position' 的默认值 "static"。

3.绝对定位元素
总的来说，绝对定位（"position: absolute"）元素的包含块由离它最近的 'position' 属性为 'absolute'、'relative' 或者 'fixed' 的祖先元素创建。
如果其祖先元素是行内元素，则包含块取决于其祖先元素的 'direction' 特性
一个绝对定位框会为它的常规流子元素和定位子元素(不包含 fiexed 定位的元素)生成一个新的包含块。 不过，绝对定位元素的内容不会在其它框的周围排列。

4.固定定位元素
如果元素是固定定位 ("position:fixed") 元素，那么它的包含块是当前可视窗口

5.浮动元素
浮动元素的包含块是其最近的块级祖先元素

>小结：
>包含块影响使用最多的还是绝对定位和相对定位，对于fixed定位来说场景比较固定，但是对于一些需要基于内容而不是视窗固定的效果来说，就需要fixed+absolute来解决