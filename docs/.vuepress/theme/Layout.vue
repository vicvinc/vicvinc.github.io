<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
    <div class="container row m-auto">
      <div v-if="$page.frontmatter.home" class="home-hero" :style="HeroBgStyle"></div>
      <Home v-if="$page.frontmatter.home" class="col-8"/>
      <Page v-else :sidebar-items="sidebarItems" class="col-8">
        <slot name="page-top" slot="top"/>
        <slot name="page-bottom" slot="bottom"/>
      </Page>
      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar" class="col-4">
        <slot name="sidebar-top" slot="top"/>
        <slot name="sidebar-bottom" slot="bottom"/>
      </Sidebar>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Vue from "vue";
import nprogress from "nprogress";
import Home from "./Home.vue";
import Navbar from "./Navbar.vue";
import Page from "./Page.vue";
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer";

import { resolveSidebarItems } from "./util";

const HeroImages = [
  require("./images/hero-bg-0.jpeg"),
  require("./images/hero-bg-1.jpeg"),
  require("./images/hero-bg-2.jpeg"),
  require("./images/hero-bg-3.jpeg"),
  require("./images/hero-bg-4.jpeg"),
  require("./images/hero-bg-5.jpeg"),
  require("./images/hero-bg-6.jpeg"),
  require("./images/hero-bg-7.jpeg"),
  require("./images/hero-bg-8.jpeg"),
  require("./images/hero-bg-9.jpeg"),
  require("./images/hero-bg-10.jpeg"),
  require("./images/hero-bg-11.jpeg")
];

export default {
  components: { Home, Page, Sidebar, Navbar, Footer },
  data() {
    return {
      isSidebarOpen: false
    };
  },

  computed: {
    HeroBgStyle() {
      const rd = Math.floor(Math.random() * 11) % 12;
      return { backgroundImage: `url(${HeroImages[rd]}` };
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.layout &&
        // !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar
        },
        userPageClass
      ];
    }
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);

    // configure progress bar
    nprogress.configure({ showSpinner: false });

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start();
      }
      next();
    });

    this.$router.afterEach(() => {
      nprogress.done();
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    }
  }
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.styl" lang="stylus"></style>
