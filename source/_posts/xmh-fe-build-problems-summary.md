---
title: 2017项目总结
date: 2017-04-06 16:55:03
tags: [FE-Summary]
cover: cover.jpg
myexcerpt: From chaos to ordered.
---

`17年初的时候离开北京来到西安，打算在这里开始生活一段时间，第一个接手的项目就是为公司的APP打造一个Mobile版本，这里总结一下其中遇到的一些问题。`

## 项目：xmh-comic-mobile-web-app ##

## 描述：Mobile Comic Reader. ##

## 需求： ##
UI&UX&业务逻辑仿照已有的原生APP，使用和app相同的接口，功能涵盖用户Auth／漫画阅读／评论／支付；

## 数据设计问题 ##
  `meta数据的设计`
  meta数据的设计来源于现实业务模型中的各个角色，常出现在数据库的建模阶段即概念模型建立阶段，在这个阶段需要做的事情就是对已有的需求进行整理，将聚合性相关的数据和角色关联，再对不同的角色之间的关系作出DBMS模型，使用DBMS软件就可以建立相关的数据库了。
  这个阶段发现的问题主要有这么几个：

  1. 消息层的语义数据混杂到了数据区，具体表现在数据区的外层通畅含有一个表示当前业务逻辑处理状态的消息码和其他消息状态数据；
  2. 展示层的配置数据混杂到了数据区，具体表现在通过一个配置数据来控制数据的展示方式；
  3. 列表型接口返回的数据不是一个列表，造成接口语义丧失，这个问题出看起来不是很严重，但是到了实际开发中，往往无比头疼；
  4. 数据归属不明确，依附与不同的接口，但是却不跟业务耦合。这类问题表现在，一些数据在UI展示层会用到，但是没有明确的将其归属到数据库实体上，而是在数据的外层以附带的方式出现。比如一个评论列表的评论数量按照业务模型规定的是所有的评论和回复加起来的数量，这个数据显然归属于评论的目标，这个时候如果在获取的评论列表外层再添加上所有的评论数不仅破坏了评论列表的数据结构（数组 => 对象），而且没有任何个归属实体；
  5. 部分接口缺少业务功能。一些业务上的功能，比如作品按照更新星期的聚合，作品列表的章节显示内容等等，这些都应该在接口侧进行处理，这样将业务代码尽量归属到服务器侧，对于一份数据多端使用的产品来说，这样做的好处是显而易见的。再比如，作品和章节的可阅读情况（收费或者免费），就应该由服务器计算出最终结果然后分发给多端，而不是让所有客户端自己拿到作品信息和作品付费情况自己去计算，这样一旦业务模型发生了变化，客户端就需要更新了，且对于APP来说旧版本上还是之前的业务模型，这样的设计真的是一场灾难。还有，业务数据的排序问题,业务数据的吞吐量，这类问题理应在数据接口层就已经处理好的，万万不该放到客户端来处理。anyway, It's a disaster！
  6. 以上的这些问题还衍生出来一系列其他问题，比如数据嵌套层数变得像回调地狱一般，一个按钮上依赖的逻辑多达三四个接口等等。


  小结： 以上的问题大多数是数据库的设计问题，如果在第一次建模完成之后，继续迭代到下一次的数据模型和业务需求，就会发现和避免很多。然而我的阅历也是有限，有很多地方智能感受到而不能指出具体不对在什么地方。按照做了事情，做对了事情，做好了事情来打分的话，只能得一个🌟

  ### 评分： 🌟 ###

  解决：

  1. 首先将所有列表数据的外层数据都剔除掉，剔除的数据按照其属性归属到相关的实体上，对于一个漫画相关的产品来说，实体主要有这么几个： 漫画（列表）， 漫画的章节（列表），评论／回复（列表），用户（列表），订单（列表）；
  2. 将描述同一个业务的不同接口数据合并
  3. 将数据内容相同的不同业务接口按照业务逻辑进行同构，比如一个主题（侦探类）的漫画，和一个用户订阅的漫画，在数据层上的结构可以同构为一个漫画列表，至于每个漫画的属性数据，按照不同的业务需求来聚合
  4. 将嵌套层数过多的数据提取出来，单独作为一个数据接口使用
  5. 如果接口数据附带配置信息，则将接口作为单独的业务接口使用，这样业务接口数据和相应的业务组件可以做到很好的耦合


  上述罗列的条目只是针对目前已有的问题进行优化，而非重新设计，所以说不能从根本上解决这些问题的出现

## UI设计问题 ##

  `栅格`

  栅格或者说表格布局，是为了将不同的区域进行有序排列和视觉统一的规划方式。
  对于类似栅格布局里面的元素，采用分割线分离，使得栅格系统无法发挥自身的排版优势，同时栅格的设计比例也比较奇怪，水平方向上的栅格宽度不是使用12分或者8分或者24分的设计，而是一个不成比例的数字，并且纠结于这个数字的像素单位不能改变。这种设计虽然用rem方案可以适应各种屏幕，但是一旦从小屏幕跑到中等屏幕，整个页面就会变得和水桶一般，完全失去设计师们所想要的最后一丝设计感。
  多个栅格之间没有关联性，栅格之间缺少成文的比例约束，使布局看起来混乱陈旧。
  栅格模块之间的间距没有关联性，且栅格排版样式过于多样化，造成内容之间互相独立，不利于用户能够找到自己感兴趣的内容区块。
  内容模块的header部分引导和内容关联程度低，icon没有起到应该有的修饰作用，造成信息传达噪音。
  栅格的meta信息之间缺少对称性，信息的分类和信息所处的位置不相称。

  ## 优化方案：
  1. 使用设计比较成熟的Grid系统代替没有比例约束的设计UI；
  2. 简化栅格内容的修饰样式，去掉边框，稳定间距，移除一些不均衡的说明性文字，规范化栅格的排列方式和响应式动作；
  3. 简化功能内容，将一些需要一整页显示的内容剔除掉无关的，只保留有效内容作为展示数据，然后植入首页；


  附一张修改后的UI设计：![ShowImage](/ui-new.png)
  对比一下之前的UI：![ShowImage](/ui-old.png)


  `icon管理`

  初次接触到切图稿的时候，发现一个很严重的问题，我们的icon有500+，针对retina屏幕每个icon有两张图，也就是说一个小小的app里面有250+个icon。这对设计师来说是一个不小的挑战，要设计一一套有250+个icon，且视觉风格统一，具有鲜明品牌特色的icon，我想肯定不是什么简单的事情（事实证明在icon的设计上我也想不明白为什么会有这么多的icon）。首先在icon的尺寸上，没有任何的规范可言，一个icon的大小可能是任意的，甚至不夸张的说是随机的。同时icon的裁切也是很任性，常规的icon不管尺寸至少长宽比例在1:1上，但是从切图稿上来说很多都不是这样。因为原始的设计稿经手过好几个人，已经丢失原始的设计文件（psd稿），而且也没时间去重新切图（😢）。总之，icon的爆炸算是项目管理失败的一个副产物，但是最主要的问题，还是产品总体的把握上，太过于随意，没有目标的滥用icon导致。
  
  ## 优化方案：
  1. 重新描摹，导出为SVG，然后直接使用SVG，因为SVG是矢量图，所以可以直接用在不同屏幕上，这样将原先的500+icon数量缩减到250+
  2. 将部分简单的icon，比如单色调，闭合曲线，符合icon-font生成规范的制作成icon-font，使用工具：icomoon，同样的icon-font的渲染采用的是字体的渲染方式，在数量缩减上可以和SVG达到相同的目标，而且icon font一次生成所有的icon样式，在使用时相当方便。
  3. sprites-image即育碧图，是一种减少图像请求配合css背景填充的icon渲染方式，这样做可以将多个icon合成到同一张图中，然后使用Compass等相关工具生成样式表，使用起来也相当方便。制作过程中需要写一些脚本来出来图片文件，比如图片的重命名，去掉无关后缀，等等，这里可以使用nodeJs现将图片名处理好，生成scss的icon-list，然后使用Compass根据生成的icon-list制作精灵图。
  4. 使用开源的icon字体库，对于一些功能展示含义比较通用的icon，可以选择比较美观的开源icon，对于设计团队来说，如果前期要速成产品的话，大可以使用，后期再用自己设计的icon做替换就行。


  `排版`

  当初接触设计的时候是没有任何的排版概念的，写过毕业论文的时候大概了解过，从主题到摘要，主标题到副标题，如果没有一个字体的规范，排出来的文章是多么的糟糕。阅读一个没有排版的文本是特别容易疲劳的，除非文本自身的内容非常吸引人。一般的设计稿针对主标题，副标题，提示性文本，正文，标注文本等等都会进行一个统一的约束，这样在文本的展示中才不会出现差异引起的混乱。由于要做文字在不同尺寸屏幕上的适配工作，所以我对设计中的文本字体和字号进行了一下统计.
  
  ```scss
  $base-font-size: 28px;
  $h60-font-size: 60px;
  $h40-font-size: 40px;
  $h1-font-size: 36px;
  $h2-font-size: 32px;
  $h3-font-size: 30px;
  $h4-font-size: 28px;
  $h5-font-size: 26px;
  $h6-font-size: 24px;
  $h7-font-size: 22px;
  $h8-font-size: 20px;
  ```
  从统计的结果中可以隐约的看到，正文落在了28px这个字号上，主标题落在了36px上，这是在2x的设计上统计出来的，如果落到1x的设计，以2的比率计算，应该是18和14，使用黄金比计算的话，应该在17和22。对于这样的排版设计，在适配上，只能粗略的使用1x=14，2x=28，3x=42这样的形式来处理，视觉上倒是可以说的过去，但是从设计上来说，这种排版太过于机械，没有美感。而且按照这样的方式，对于h7和h8的字号，在浏览器最小字号的限制下这种适配已经失效，所以为什么在那么小的屏幕上还要用那么小的字体，我也是很困惑。

  还有，字间距… 通常英文排版的字间距在1.2到1.4，中文因为比较紧密，所以在1.5到1.8之间比较合适，但是… 我完全看不出来字间距有什么规律可言。至于标题之间的间距，更不用说了。

  ## 优化方案
  1. 根据使用的情况，缩减和合并字体的大小数量。比如对于内容区高度一样的区域，其内部使用相同大小的字体
  2. 规定正文排版的行高和字间距，行高定义标准行高1, 多行行高1.4，标题行高1.8
  3. 使用em或者rem作为字体单位，以达到适配效果


  `间距`

  写给大家看的设计书中提出了四个简要的设计原则，对比，对齐，重复，亲密性。个人觉得间距在这四个原则里面都有体现，可以这样说，间距的对比恰恰可以体现出亲密性，就像电影场景里的人物位置所隐喻的人人之间的亲密关系，现实聚会上饭桌上人人之间的距离，在水平方向上的排版中，可以通过间距来对元素进行对齐，比如栅格列表，重复就不必再说了。
  这部分主要做的就是将不同内容区域之间的间距做一个统一，在视觉上看会显得清爽很多。

  `内容扩展`

  `图片比例`
  漫画类阅读最重要的展示就是封面的展示情况了，如果封面不够美观或者封面的排版不够整洁，往往会失去用户的关注点。这里可以关注一下维基百科对于[图片比例的条目](https://en.wikipedia.org/wiki/Aspect_ratio_(image))，所以在封面图的排版上，重新做了一下整理。

  图片封面比例
  1. 对于单幅的图片来说，宽度通常是内容区的100%，所以这个时候需要选取一个合适的高度使其看起来美观又大气。这里选取黄金分割比例，即高度 = 宽度 ／ 1.618
  2. 对于多幅的图片来说，对于处于同一行列的两张图来说，宽度通常在屏幕宽度的40%～50%，同样适用黄金分割比例
  3. 对于三张处在同一行内的图片来说，这样的宽度如果选择黄金比例则显得有些细长，4:3是一个不错的比例，比较古典。这里选取了白银比例：1.414，略大于4:3，实际效果也比较美观。即高度 = 宽度 ／ 1.414


  贴一下整理后的图片比例效果：
  ![ShowImage](/ui-image-aspect-1.png)
  ![ShowImage](/ui-image-aspect-3.png)
  ![ShowImage](/ui-image-aspect-2.png)
  

  `按钮`

## 问题解决方案汇总 ##

`* REM自适应布局`
`* sass`
`* font-icon图标处理`
`* compass的icon-sprite图片整合`
`* font-min字体压缩`
`* post CSS`
`* flex box`
`* fastclick`
`* svg`