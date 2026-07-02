import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LeonidsLayout from './components/LeonidsLayout.vue'
import HomePostList from './components/HomePostList.vue'
import TagCloud from './components/TagCloud.vue'
import GalleryGrid from './components/GalleryGrid.vue'
import './styles/leonids.css'

const theme: Theme = {
  extends: DefaultTheme,
  // 用 Leonids 风格的自定义 Layout 取代默认主题外壳
  Layout: LeonidsLayout,
  enhanceApp({ app }) {
    app.component('HomePostList', HomePostList)
    app.component('TagCloud', TagCloud)
    app.component('GalleryGrid', GalleryGrid)
  }
}

export default theme
