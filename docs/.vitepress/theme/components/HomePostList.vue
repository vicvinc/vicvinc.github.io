<script setup lang="ts">
import { data as posts } from '../../data/posts.data'
import { fromNow } from '../utils'

interface Post {
  url: string
  frontmatter: {
    title?: string
    date?: string
    excerpt?: string
    cover?: string
    tags?: string[] | string
  }
}

function stringifyTags(tags?: string[] | string): string {
  if (Array.isArray(tags)) return tags.length ? tags.join(' | ') : '未分类'
  return tags || '未分类'
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
      <header class="post-header">
        <p class="post-meta">
          <span class="post-date">{{ fromNow(post.frontmatter.date as string) }}</span>
          <span class="sep">•</span>
          <span class="post-cat">{{ stringifyTags(post.frontmatter.tags) }}</span>
        </p>
        <h4>
          <a class="post-title-link" :href="post.url">{{ post.frontmatter.title }}</a>
        </h4>
      </header>
      <div v-if="post.frontmatter.excerpt" class="post-description">
        <p>{{ post.frontmatter.excerpt }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.post-listing {
  background: var(--leonids-white);
}
section.post {
  margin-bottom: 20px;
}
section.post:not(:last-child) {
  border-bottom: 1px dashed var(--leonids-pink);
}

.post-cover {
  display: block;
  position: relative;
  margin-bottom: 20px;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
@media (max-width: 768px) {
  .post-cover {
    height: 140px;
    background-attachment: scroll;
  }
}

.post-meta {
  font-size: 13px;
  font-weight: bold;
  margin: 0 0 0.3rem;
}
.post-date {
  color: var(--leonids-secondary);
}
.post-cat {
  text-transform: uppercase;
  color: var(--leonids-warning);
}
.sep {
  margin: 0 0.4em;
  opacity: 0.4;
}

h4 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
}
.post-title-link {
  color: var(--leonids-primary);
  font-size: 1.1rem;
}
.post-title-link:hover {
  color: var(--leonids-primary-light);
}

.post-description {
  margin-top: 0.25rem;
}
.post-description p {
  margin: 0;
  color: var(--leonids-text-soft);
  line-height: 1.6;
}
</style>
