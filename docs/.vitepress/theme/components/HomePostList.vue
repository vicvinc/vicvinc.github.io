<script setup lang="ts">
import { data as posts } from '../../data/posts.data'
import { fromNow } from '../utils'

interface Post {
  url: string
  readingTime?: number
  frontmatter: {
    title?: string
    date?: string
    excerpt?: string
    cover?: string
    tags?: string[] | string
  }
}

function tagsOf(post: Post): string[] {
  const t = post.frontmatter.tags
  if (Array.isArray(t)) return t
  return typeof t === 'string' ? [t] : []
}
</script>

<template>
  <main class="post-listing">
    <section
      v-for="post in (posts as Post[])"
      :key="post.url"
      class="post"
    >
      <a
        v-if="post.frontmatter.cover"
        class="post-cover"
        :href="post.url"
        :style="{ backgroundImage: `url(${post.frontmatter.cover})` }"
        :aria-label="post.frontmatter.title"
      />

      <div class="post-body">
        <h3 class="post-title">
          <a class="post-title-link" :href="post.url">{{ post.frontmatter.title }}</a>
        </h3>

        <div class="post-meta">
          <span class="post-date">{{ fromNow(post.frontmatter.date as string) }}</span>
          <span v-if="post.readingTime" class="sep">·</span>
          <span v-if="post.readingTime" class="read-time">约 {{ post.readingTime }} 分钟</span>
        </div>

        <p v-if="post.frontmatter.excerpt" class="post-excerpt">
          {{ post.frontmatter.excerpt }}
        </p>

        <div v-if="tagsOf(post).length" class="post-tags">
          <a
            v-for="t in tagsOf(post)"
            :key="t"
            class="post-tag"
            :href="`/tags#${encodeURIComponent(t)}`"
          >{{ t }}</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.post-listing {
  background: var(--leonids-white);
}

/* —— 卡片节奏 —— */
section.post {
  padding: 1.75rem 0;
  margin: 0;
}
section.post:first-child {
  padding-top: 0.25rem;
}
section.post:not(:last-child) {
  border-bottom: 1px dashed var(--leonids-pink);
}

/* —— 封面：恢复 fixed 视差 —— */
.post-cover {
  display: block;
  width: 100%;
  height: 240px;
  margin-bottom: 1.5rem;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* 滚动视差：各卡片图像相对视口固定 */
}
@media (max-width: 768px) {
  .post-cover {
    height: 180px;
    background-attachment: scroll; /* iOS 对 fixed 支持差，移动端降级 */
  }
}

/* —— 正文块：左右留白 + hover 微抬 —— */
.post-body {
  padding: 0 1.25rem;
  transition: transform 0.2s ease;
}
section.post:hover .post-body {
  transform: translateY(-2px);
}
section.post:hover .post-title-link {
  background-size: 100% 1px;
}

/* —— 标题 —— */
.post-title {
  margin: 0 0 0.5rem;
  font-family: var(--leonids-font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}
.post-title-link {
  color: var(--leonids-primary);
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: color 0.15s ease, background-size 0.3s ease;
}
.post-title-link:hover {
  color: var(--leonids-primary-light);
  background-size: 100% 1px;
}

/* —— meta：日期 · 阅读时长 —— */
.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.85rem;
  font-size: 0.82rem;
  line-height: 1.4;
  color: var(--leonids-text-soft);
}
.post-date {
  color: var(--leonids-text-soft);
  font-weight: 600;
}
.read-time {
  color: var(--leonids-primary);
}
.sep {
  opacity: 0.4;
}

/* —— 摘要：限宽 + 舒展行高 —— */
.post-excerpt {
  margin: 0 0 1.1rem;
  max-width: 65ch;
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--leonids-text-soft);
}

/* —— 标签：底部话题行，淡橙 pill —— */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.post-tag {
  display: inline-block;
  padding: 0.12rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--leonids-warning);
  background: rgba(245, 166, 35, 0.12);
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease;
}
.post-tag:hover {
  background: rgba(245, 166, 35, 0.22);
}
</style>
