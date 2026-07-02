<script setup lang="ts">
import { data as posts } from '../../data/posts.data'

interface Post {
  url: string
  frontmatter: {
    title?: string
    date?: string
    excerpt?: string
    tags?: string[] | string
  }
  readingTime?: number
}

function formatDate(d?: string): string {
  if (!d) return ''
  const dt = new Date(d)
  return Number.isNaN(+dt) ? d : dt.toISOString().slice(0, 10)
}

function tagsOf(post: Post): string[] {
  const t = post.frontmatter.tags
  if (Array.isArray(t)) return t
  if (typeof t === 'string') return [t]
  return []
}
</script>

<template>
  <ul class="post-list">
    <li v-for="post in (posts as Post[])" :key="post.url" class="post-item">
      <a class="post-title" :href="post.url">{{ post.frontmatter.title }}</a>
      <div class="post-meta">
        <span>{{ formatDate(post.frontmatter.date) }}</span>
        <span v-if="post.readingTime">· 约 {{ post.readingTime }} 分钟</span>
        <span v-if="tagsOf(post).length" class="post-tags">
          <a
            v-for="t in tagsOf(post)"
            :key="t"
            :href="`/tags#${encodeURIComponent(t)}`"
          >{{ t }}</a>
        </span>
      </div>
      <p v-if="post.frontmatter.excerpt" class="post-excerpt">
        {{ post.frontmatter.excerpt }}
      </p>
    </li>
  </ul>
</template>

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-item {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.post-item:last-child {
  border-bottom: none;
}
.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.post-title:hover {
  color: var(--vp-c-brand-1);
}
.post-meta {
  margin-top: 0.4rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}
.post-tags {
  display: inline-flex;
  gap: 0.5rem;
}
.post-tags a {
  color: var(--vp-c-brand-2);
  text-decoration: none;
}
.post-tags a:hover {
  text-decoration: underline;
}
.post-excerpt {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
</style>
