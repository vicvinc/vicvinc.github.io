import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "vicvinc's notes.",
  description: 'sunshine water air and something else.',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;0,700;1,500&family=Roboto+Mono&family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap'
      }
    ],

    // Google Analytics (gtag.js)
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-BTLXGM0FS5' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BTLXGM0FS5');`
    ]
  ],

  themeConfig: {
    sidebar: false,

    // 顶部导航（SiteNav 消费）
    nav: [
      { text: '首页', link: '/' },
      { text: '标签', link: '/tags' },
      { text: '相册', link: '/gallery' }
    ],

    // Leonids 作者卡（AuthorSidebar 消费）
    author: 'vicvinc',
    tagline: 'C3H6 design.',
    bio: 'Silence is Golden.',
    social: [
      { text: 'GitHub', link: 'https://github.com/vicvinc' },
      { text: 'Email', link: 'mailto:vicvinvinc@gmail.com' }
    ]
  }
})
