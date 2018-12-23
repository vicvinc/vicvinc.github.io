<template>
  <main class="post-listing">
    <section v-for="(post, idx) in posts" class="post" :key="post.key">
      <div
        v-if="post.frontmatter.cover"
        class="post-cover"
        :style="{backgroundImage: `url(${post.frontmatter.cover})`}"
      />
      <header class="post-header">
        <p class="post-meta">
          <span class="post-date">{{ post.frontmatter.date | fromNow }}</span>
          •
          <a class="post-cat" href="/tags">{{ post.frontmatter.tags | stringifyTags }}</a>
        </p>
        <h4>
          <a
            class="post-title"
            :href="`${base}${post.path}`"
            :title="post.frontmatter.title"
          >{{ post.frontmatter.title }}</a>
        </h4>
      </header>
      <div class="post-description">
        <p>{{ post.frontmatter.excerpt }}</p>
      </div>
    </section>
  </main>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

export default {
  name: "home-post-list",
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    base() {
      const { base = "" } = this.$site;
      return base;
    }
  },
  filters: {
    fromNow(t) {
      const d = new Date(t).toUTCString();
      return dayjs(d).fromNow();
    },
    stringifyTags(tags) {
      if (tags instanceof Array)
        return tags.length > 0 ? tags.join(" | ") : "未分类";
      return tags;
    }
  }
};
</script>

<style lang="scss" src="./sass/index.scss">
</style>
