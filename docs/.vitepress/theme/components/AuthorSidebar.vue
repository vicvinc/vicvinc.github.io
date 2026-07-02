<script setup lang="ts">
import { useData } from 'vitepress'
import avatar from '../assets/avatar.jpeg'

const { theme } = useData()
const author = theme.value.author || 'vicvinc'
const bio = theme.value.bio || 'Silence is Golden.'
const tagline = theme.value.tagline || 'C3H6 design.'
const social = theme.value.social || []
</script>

<template>
  <aside class="author-card">
    <img class="avatar" :src="avatar" :alt="author" />
    <a class="author-name" href="/">{{ author }}</a>
    <p class="tagline">{{ tagline }}</p>
    <p class="bio">{{ bio }}</p>

    <div v-if="social.length" class="social">
      <a
        v-for="s in social"
        :key="s.link"
        :href="s.link"
        class="social-link"
        :title="s.text"
        :target="s.link.startsWith('http') ? '_blank' : undefined"
      >{{ s.text }}</a>
    </div>
  </aside>
</template>

<style scoped>
.author-card {
  text-align: center;
  padding: 1.5rem 1rem;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0 auto 0.75rem;
  display: block;
  object-fit: cover;
}
.author-name {
  display: block;
  font-family: var(--leonids-font-serif);
  color: var(--leonids-pink-name);
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: lowercase;
}
.author-name:hover {
  color: var(--leonids-pink);
}
.tagline {
  margin: 0.2rem 0 0;
  color: var(--leonids-text-soft);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.bio {
  margin: 0.75rem 0;
  font-size: 0.9rem;
  color: var(--leonids-text-soft);
  line-height: 1.5;
}
.social {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}
.social-link {
  color: var(--leonids-secondary);
  font-size: 0.85rem;
}
.social-link:hover {
  color: var(--leonids-primary);
}
</style>
