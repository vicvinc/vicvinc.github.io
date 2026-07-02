<script setup lang="ts">
import { useData } from 'vitepress'

const { site, theme } = useData()
const nav = theme.value.nav || []
</script>

<template>
  <header class="site-nav">
    <div class="nav-inner">
      <a class="site-title" href="/">{{ site.title }}</a>
      <nav class="nav-links">
        <a
          v-for="item in nav"
          :key="item.link"
          :href="item.link"
          class="nav-link"
        >{{ item.text }}</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--leonids-navbar-h);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.nav-inner {
  max-width: var(--leonids-content-max);
  height: 100%;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.site-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--leonids-text);
}
.site-title:hover {
  color: var(--leonids-primary);
}
.nav-links {
  display: flex;
  gap: 1.25rem;
}
.nav-link {
  font-size: 0.95rem;
  color: var(--leonids-text-soft);
  text-transform: lowercase;
}
.nav-link:hover {
  color: var(--leonids-primary);
}
</style>
