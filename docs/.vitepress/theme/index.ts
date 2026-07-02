import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePostList from './components/HomePostList.vue'
import PostMeta from './components/PostMeta.vue'
import TagCloud from './components/TagCloud.vue'
import GalleryGrid from './components/GalleryGrid.vue'

const theme: Theme = {
  extends: DefaultTheme,
  // 在文档正文顶部注入文章元信息（日期 / 阅读时长 / 标签）。
  // PostMeta 内部用 frontmatter.date 判断，非文章页自动不渲染。
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(PostMeta)
    }),
  enhanceApp({ app }) {
    app.component('HomePostList', HomePostList)
    app.component('TagCloud', TagCloud)
    app.component('GalleryGrid', GalleryGrid)
    // PostMeta 通过 Layout 的 doc-before 插槽注入，无需全局注册
  }
}

export default theme
