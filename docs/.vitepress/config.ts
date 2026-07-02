import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "vicvinc's notes.",
  description: 'sunshine water air and something else.',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,

  themeConfig: {
    // 博客为扁平结构，不需要左侧分组侧边栏；文章页靠右侧大纲导航
    sidebar: false,

    nav: [
      { text: '首页', link: '/' },
      { text: '标签', link: '/tags' },
      { text: '相册', link: '/gallery' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vicvinc/vicvinc.github.io' }
    ],

    outline: {
      level: [2, 3],
      label: '本页内容'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdatedText: '最后更新',

    footer: {
      message: 'Written in markdown. Powered by VitePress.',
      copyright: 'Copyright © 2016–present vicvinc'
    }
  }
})
