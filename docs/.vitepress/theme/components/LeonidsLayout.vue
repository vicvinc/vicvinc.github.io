<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import SiteNav from './SiteNav.vue'
import AuthorSidebar from './AuthorSidebar.vue'
import ThemeFooter from './ThemeFooter.vue'
import PostMeta from './PostMeta.vue'

const { frontmatter } = useData()
const isHome = computed(() => Boolean(frontmatter.value.home))

// hero 背景图（构建期 glob 出 URL）。SSR 用第一张避免水合不一致，
// 客户端挂载后再随机换一张，保留老站"每次刷新换图"的感觉。
const heroModules = import.meta.glob('../assets/hero-bg-*.jpeg', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>
const heroUrls = Object.values(heroModules)
const hero = ref(heroUrls[0] || '')
onMounted(() => {
  if (heroUrls.length > 1) {
    hero.value = heroUrls[Math.floor(Math.random() * heroUrls.length)]
  }
})
</script>

<template>
  <div class="leonids-layout">
    <SiteNav />

    <div
      v-if="isHome"
      class="leonids-hero"
      :style="{ backgroundImage: `url(${hero})` }"
    />

    <main class="leonids-main">
      <div class="leonids-row">
        <div class="leonids-content-col">
          <PostMeta />
          <Content />
        </div>
        <div class="leonids-side-col">
          <AuthorSidebar />
        </div>
      </div>
    </main>

    <ThemeFooter />
  </div>
</template>
