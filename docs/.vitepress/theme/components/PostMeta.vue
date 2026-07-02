<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../data/posts.data'

const { page, frontmatter } = useData()

// 仅在有 date 的页面（即文章页）渲染
const isPost = computed(() => Boolean(frontmatter.value.date))

// 当前文章在 posts.data 中的记录，用于取 readingTime / wordCount
const current = computed(() =>
  posts.find((p) => p.url === page.value.path)
)

function formatDate(d: string): string {
  const dt = new Date(d)
  return Number.isNaN(+dt) ? d : dt.toISOString().slice(0, 10)
}

const tags = computed<string[]>(() => {
  const t = frontmatter.value.tags
  return Array.isArray(t) ? t : typeof t === 'string' ? [t] : []
})
</script>

<template>
  <div v-if="isPost" class="post-meta">
    <span class="date">{{ formatDate(frontmatter.date) }}</span>
    <span v-if="current?.readingTime">· 约 {{ current.readingTime }} 分钟</span>
    <span v-if="tags.length" class="tags">
      <a
        v-for="t in tags"
        :key="t"
        :href="`/tags#${encodeURIComponent(t)}`"
      >#{{ t }}</a>
    </span>
  </div>
</template>

<style scoped>
.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin: 0 0 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
.tags {
  display: inline-flex;
  gap: 0.5rem;
}
.tags a {
  color: var(--vp-c-brand-2);
  text-decoration: none;
}
.tags a:hover {
  text-decoration: underline;
}
</style>
