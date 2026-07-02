# VitePress 迁移设计

> 日期: 2026-07-02 ｜ 分支: `feat/vitepress-migration`
> 状态: 已批准，实施中

## 背景

`vicvinc.github.io` 是一个 2018 年的 VuePress 博客，已 ~7.5 年未维护。本机 Node v25 与 `node-sass@4` 不兼容，源码已无法构建；线上靠已提交的 `dist/`（30MB）苟活。`package.json` 甚至未声明 `vuepress` 依赖。readme 留有 5 条未完成 todos。

## 决策（来自澄清问答）

| 维度 | 选择 |
|------|------|
| 技术栈 | 从 VuePress 迁移到 **VitePress**（官方继任者，Vite + Vue 3，Node 25 友好） |
| 主题 | **默认主题 + 轻量定制**（不重写整套自定义主题） |
| 部署 | **GitHub Actions** 自动构建部署到 Pages |
| 范围 | 基础迁移 + **全部 5 条 todos** |
| 视觉 | **极简文字风**（默认绿调，文字 hero，无大图背景） |

## 目录结构

```
vicvinc.github.io/
├── .github/workflows/deploy.yml        # 新：Actions 构建+部署
├── .gitignore                          # 加 node_modules / .vitepress/{cache,dist}
├── package.json                        # 新：仅 vitepress；dev/build/preview 脚本
├── README.md
├── specs/                              # 设计文档（本文件，在 VitePress 源目录之外）
└── docs/                               # VitePress 源根
    ├── index.md                        # 首页 = 文章列表
    ├── tags.md                         # 标签云 + 分组
    ├── gallery.md                      # 相册
    ├── posts/*.md                      # 12 篇文章（+ <slug>/cover.png 资产）
    ├── public/
    │   ├── gallery/*.png               # 24 张相册图
    │   └── posts/<slug>/cover.png      # 封面（frontmatter cover 改绝对路径）
    └── .vitepress/
        ├── config.ts                   # 站点配置：title/nav/sidebar/base='/'
        ├── theme/
        │   ├── index.ts                # 扩展默认主题 + 全局注册组件
        │   ├── style.css               # 默认绿调微调
        │   └── components/
        │       ├── HomePostList.vue    # 首页：按日期倒序的文章卡片
        │       ├── PostMeta.vue        # 文章顶部：日期·阅读时长·标签
        │       ├── TagCloud.vue        # 标签云 + 分组
        │       └── GalleryGrid.vue     # 相册网格
        └── data/
            ├── posts.data.ts           # createContentLoader + 字数/阅读时长
            └── gallery.data.ts         # glob public/gallery 产出清单
```

## 五条 Todos 落点

| Todo | 实现 |
|------|------|
| ⑤ 首页按时间排序 | `HomePostList` 读 `posts.data`，按 `frontmatter.date` 倒序；仅列 `posts/` 下页面 |
| ② 标签云/时间线 | 单页 `/tags`：`TagCloud` 按 `frontmatter.tags` 聚合（12 篇不做独立 `/tags/:tag` 路由，YAGNI） |
| ③ 相册 | `/gallery`：`GalleryGrid` + `gallery.data`，网格 + 点击放大 |
| ④ 字数 & 阅读时长 | `posts.data.ts` 构建期算字数/时长注入元数据；`PostMeta` 展示 |
| ① 文章详情 | 覆盖 doc layout：有 `frontmatter.date` 的页面顶部插 `PostMeta` |

## 数据流（核心）

`posts.data.ts` 用官方 `createContentLoader('posts/*.md')` + `transform` 按日期倒序，并附加 `wordCount` / `readingTime`。组件 `import { data as posts } from './posts.data'` 消费。这是 VitePress 官方博客范式（已对照 2026 最新文档核对）。

## 阅读时长算法（用户实现）

`estimateReadingTime(rawMarkdown)` 由用户填实现——计数策略（CJK 字 vs 拉丁词）和阅读速度假设是设计决策。我留骨架 + TODO。

## 部署

`.github/workflows/deploy.yml`：push `master` → Node 24 → `npm ci` → `npm run build` → `upload-pages-artifact`(`docs/.vitepress/dist`) → `deploy-pages`。`base: '/'`。用户需在 GitHub 仓库 Settings → Pages → Source 选 "GitHub Actions"（一次性）。

## Git 策略

全部工作在 `feat/vitepress-migration` 分支增量提交；不碰 master、不 force push；合并权在用户。

## 验证门槛

- `npm run build` 成功（硬门槛）
- `npm run preview` 点查：首页排序、标签聚合、相册渲染、PostMeta 显示、无 404
- 静态站不引单元测试框架，构建即验证
