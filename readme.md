# vicvinc's notes

A personal blog — write & share something on the internet.

Written by vicvinc · since 2016 · built with [VitePress](https://vitepress.dev).

## 技术栈

- **VitePress**（默认主题 + 轻量定制）—— Vue 3 + Vite
- 内容：`docs/posts/` 下的 markdown
- 构建期数据加载器（`docs/.vitepress/data/`）驱动首页列表、标签、相册、阅读时长
- 部署：GitHub Actions → GitHub Pages（push 到 `master` 触发）

## 本地开发

```bash
npm install
npm run dev       # 开发服务器 http://localhost:5173
npm run build     # 构建到 docs/.vitepress/dist
npm run preview   # 预览构建产物
```

## 站点结构

| 路径 | 内容 |
|------|------|
| `/` | 首页 —— 按日期倒序的文章列表 |
| `/tags` | 标签云 + 按标签分组 |
| `/gallery` | 相册 |
| `/posts/*` | 文章 |

## 部署

合并到 `master` 即自动触发 `.github/workflows/deploy.yml` 构建并部署到 GitHub Pages。
首次需在仓库 **Settings → Pages → Source** 选择 "GitHub Actions"。

## Todos（来自最初版本，现已完成）

1. ✅ post detail design —— `PostMeta` 注入日期/阅读时长/标签
2. ✅ tag cloud —— `/tags` 标签云 + 分组
3. ✅ photo gallery —— `/gallery`
4. ✅ count words and reading time —— 构建期估算
5. ✅ sort home page posts by create time —— 首页按日期倒序

> 阅读时长算法见 `docs/.vitepress/data/posts.data.ts` 顶部的两个常量（中文 500 字/分、英文 200 词/分），可按需调整。
