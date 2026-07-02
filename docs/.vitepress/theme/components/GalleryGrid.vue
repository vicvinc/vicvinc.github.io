<script setup lang="ts">
import { ref } from 'vue'
import { data as galleryImages } from '../../data/gallery.data'

const active = ref<string | null>(null)
</script>

<template>
  <div class="gallery">
    <button
      v-for="img in galleryImages"
      :key="img.url"
      class="thumb"
      :aria-label="`放大查看 ${img.name}`"
      @click="active = img.url"
    >
      <img :src="img.url" :alt="img.name" loading="lazy" />
    </button>
  </div>

  <Teleport to="body">
    <div v-if="active" class="lightbox" @click="active = null">
      <img :src="active" :alt="active" />
    </div>
  </Teleport>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}
.thumb {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.2s ease;
}
.thumb:hover img {
  transform: scale(1.04);
}
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: zoom-out;
  padding: 2rem;
}
.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}
</style>
