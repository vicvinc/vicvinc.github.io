<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../data/posts.data'
import { formatDate } from '../utils'

interface Post {
  url: string
  frontmatter: { title?: string; date?: string; tags?: string[] | string }
}

function tagsOf(post: Post): string[] {
  const t = post.frontmatter.tags
  return Array.isArray(t) ? t : typeof t === 'string' ? [t] : []
}

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

function tagSize(count: number): number {
  return 0.95 + 0.85 * (count / maxCount.value)
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
    class="tag-group"
  >
    <h2 class="tag-group-title">{{ tag }} <span class="count">{{ ps.length }} 篇</span></h2>
    <ul>
      <li v-for="p in ps" :key="p.url">
        <a :href="p.url">{{ p.frontmatter.title }}</a>
        <span class="date">{{ formatDate(p.frontmatter.date as string) }}</span>
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
  padding: 0 0 2.5rem;
  margin: 0;
  overflow: hidden;
  list-style: none;
}
.tag-chip {
  color: var(--leonids-secondary);
  line-height: 1.2;
}
.tag-chip:hover {
  color: var(--leonids-primary);
}
.tag-chip .count {
  margin-left: 0.2rem;
  font-size: 0.7rem;
  color: var(--leonids-text-soft);
}
.tag-group {
  margin-bottom: 2rem;
}
.tag-group-title {
  color: var(--leonids-warning);
  text-transform: capitalize;
  border-bottom: 1px dashed var(--leonids-pink);
  padding-bottom: 0.3rem;
}
.tag-group-title .count {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--leonids-text-soft);
}
.tag-group ul {
  list-style: none;
  padding: 0;
}
.tag-group li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.35rem 0;
}
.tag-group li a {
  color: var(--leonids-text);
}
.tag-group li a:hover {
  color: var(--leonids-primary);
}
.tag-group li .date {
  color: var(--leonids-text-soft);
  font-size: 0.85rem;
  white-space: nowrap;
}
</style>
