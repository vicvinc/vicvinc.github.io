<template>
  <div class="sidebar pt2">
    <NavLinks/>
    <slot name="top"/>
    <div class="col pt2">
      <div class="d-table-cell">
        <a
          class="link avatar"
          href="https://vicvinc.github.io"
          title="Go to Github"
          aria-label="Go to Github"
          data-collection-slug="Github"
        >
          <img :src="require('./images/avatar.jpeg')" class="avatar-image" alt="freeCodeCamp.org">
        </a>
      </div>
      <div class="d-table-cell pl1">C3H6 design.</div>
      <div class="nemo">Silence is Golden.</div>
      <a class href="https://github.com/vicvinc">More information</a>
      <div class="pt15 pb15 mb15">
        <header class="else-where mb15">Elsewhere</header>
        <div class="linkSet">
          <a class="mr15" href="mailto:vicvinvinc@gmail.com" title="Email" aria-label="Email">
            <span class="svgIcon svgIcon--email svgIcon--21px">
              <img :src="icons.mail">
            </span>
          </a>
          <a
            class
            href="//github.com/vicvinc"
            title="github page"
            aria-label="github page"
            target="_blank"
          >
            <span class>
              <img :src="icons.github">
            </span>
          </a>
        </div>
      </div>
    </div>
    <slot name="bottom"/>
  </div>
</template>

<script>
import SidebarGroup from "./SidebarGroup.vue";
import SidebarLink from "./SidebarLink.vue";
import NavLinks from "./NavLinks.vue";
import { isActive, groupTags } from "./util";

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },
  props: ["items"],
  data() {
    return {
      openGroupIndex: 0,
      icons: {
        mail: require("./feather/mail.svg"),
        github: require("./feather/github.svg")
      }
    };
  },
  created() {
    this.refreshIndex();
  },
  watch: {
    $route() {
      this.refreshIndex();
    }
  },
  computed: {
    tagList() {
      const { pages } = this.$site;
      const tags = groupTags(pages);
      return tags.map(t => ({
        title: t,
        collapsable: false,
        type: "group",
        children: []
      }));
    }
  },
  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items);
      if (index > -1) {
        this.openGroupIndex = index;
      }
    },
    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
    },
    isActive(page) {
      return isActive(this.$route, page.path);
    }
  }
};

function resolveOpenGroupIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (
      item.type === "group" &&
      item.children.some(c => isActive(route, c.path))
    ) {
      return i;
    }
  }
  return -1;
}
</script>

<style lang="stylus">
@import './styles/config.styl';

.sidebar {
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    overflow: hidden;
  }

  .nemo {
    color: rgba(0, 0, 0, 0.68) !important;
    font-size: 16px;
    line-height: 1.4;
    font-weight: 400;
    padding: 15px 0;
    margin-bottom: 15px;
    text-size-adjust: 100%;
  }

  .more {
    font-size: 16px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  .sidebar-links {
    padding: 1.5rem 0;
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: block;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    .sidebar-links {
      padding: 1rem 0;
    }
  }
}
</style>
