<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../data/posts.data'
import { formatDate } from '../utils'

const { page, frontmatter } = useData()

const isPost = computed(() => Boolean(frontmatter.value.date))
const current = computed(() => posts.find((p) => p.url === page.value.path))

const tags = computed<string[]>(() => {
  const t = frontmatter.value.tags
  return Array.isArray(t) ? t : typeof t === 'string' ? [t] : []
})
</script>

<template>
  <div v-if="isPost" class="post-meta-detail">
    <span class="post-date">{{ formatDate(frontmatter.date as string) }}</span>
    <span v-if="current?.readingTime" class="sep">•</span>
    <span v-if="current?.readingTime" class="read-time">约 {{ current.readingTime }} 分钟</span>
    <template v-if="tags.length">
      <span class="sep">•</span>
      <a
        v-for="t in tags"
        :key="t"
        class="post-cat"
        :href="`/tags#${encodeURIComponent(t)}`"
      >{{ t }}</a>
    </template>
  </div>
</template>

<style scoped>
.post-meta-detail {
  font-size: 13px;
  font-weight: bold;
  margin: 0 0 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--leonids-pink);
}
.post-date {
  color: var(--leonids-secondary);
}
.read-time {
  color: var(--leonids-primary);
}
.post-cat {
  text-transform: uppercase;
  color: var(--leonids-warning);
  margin-right: 0.5em;
}
.sep {
  margin: 0 0.4em;
  opacity: 0.4;
}
</style>
