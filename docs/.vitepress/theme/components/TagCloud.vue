<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../data/posts.data'

interface Post {
  url: string
  frontmatter: { title?: string; date?: string; tags?: string[] | string }
}

function tagsOf(post: Post): string[] {
  const t = post.frontmatter.tags
  return Array.isArray(t) ? t : typeof t === 'string' ? [t] : []
}

function formatDate(d?: string): string {
  if (!d) return ''
  const dt = new Date(d)
  return Number.isNaN(+dt) ? d : dt.toISOString().slice(0, 10)
}

// tag -> 关联文章，按文章数降序、名称升序
const grouped = computed(() => {
  const map = new Map<string, Post[]>()
  for (const p of posts as Post[]) {
    for (const t of tagsOf(p)) {
      if (!map.has(t)) map.set(t, [])
      map.get(t)!.push(p)
    }
  }
  return [...map.entries()].sort(
    (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])
  )
})

const maxCount = computed(() =>
  Math.max(1, ...grouped.value.map(([, ps]) => ps.length))
)

// 按频次映射字号 0.95rem ~ 1.8rem
function tagSize(count: number): number {
  const min = 0.95
  const max = 1.8
  return min + (max - min) * (count / maxCount.value)
}
</script>

<template>
  <nav class="tag-cloud" aria-label="标签云">
    <a
      v-for="[tag, ps] in grouped"
      :key="tag"
      :href="`#${encodeURIComponent(tag)}`"
      :style="{ fontSize: tagSize(ps.length) + 'rem' }"
      class="tag-chip"
    >
      {{ tag }}<span class="count">{{ ps.length }}</span>
    </a>
  </nav>

  <section
    v-for="[tag, ps] in grouped"
    :id="tag"
    :key="tag"
    class="tag-section"
  >
    <h2>
      {{ tag }}<span class="count">{{ ps.length }} 篇</span>
    </h2>
    <ul>
      <li v-for="p in ps" :key="p.url">
        <a :href="p.url">{{ p.frontmatter.title }}</a>
        <span class="date">{{ formatDate(p.frontmatter.date) }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 0.9rem;
  align-items: baseline;
  margin: 1rem 0 2.5rem;
}
.tag-chip {
  color: var(--vp-c-brand-2);
  text-decoration: none;
  line-height: 1.2;
}
.tag-chip:hover {
  text-decoration: underline;
}
.tag-chip .count {
  margin-left: 0.2rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}
.tag-section {
  margin-top: 2rem;
}
.tag-section h2 {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.3rem;
}
.tag-section h2 .count {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
}
.tag-section ul {
  list-style: none;
  padding: 0;
}
.tag-section li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.35rem 0;
}
.tag-section li a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.tag-section li a:hover {
  color: var(--vp-c-brand-1);
}
.tag-section li .date {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  white-space: nowrap;
}
</style>
