<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" class="navbar">
    <b-container class="page-container px-4 d-flex justify-content-between">
      <EternaLogo />
      <p id="chat-popover-anchor" class="anchor">.</p>

      <div class="d-flex justify-content-end">
        <LoginRow v-if="!loggedIn" />
        <div class="d-none d-lg-block">
          <NavbarCollapseContent :menu="menu" />
        </div>
        <div class="d-flex">
          <NavbarIcons v-if="loggedIn" class="d-none d-md-inline-block d-lg-none" />
          <img
            v-if="loggedIn"
            src="@/assets/navbar/Toggler.svg"
            @click.stop="showSidebar = true"
            class="toggler d-inline-block d-lg-none "
          />
        </div>
        <MobileSidebar :show.sync="showSidebar">
          <SidebarMenuContent :menu="menu" />
        </MobileSidebar>
      </div>
    </b-container>
  </b-navbar>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
  import NavbarIcons from './Icons/NavbarIcons.vue';
  import NavbarCollapseContent from './NavbarMenu/NavbarCollapseContent.vue';
  import EternaLogo from './EternaLogo.vue';
  import LoginRow from './NavbarMenu/Login/LoginRow.vue';
  import SidebarMenuContent from './SidebarMenu/SidebarMenuContent.vue';
  import MobileSidebar from '../MobileSidebar.vue';

  @Component({
    components: {
      NavbarIcons,
      LoginRow,
      NavbarCollapseContent,
      EternaLogo,
      SidebarMenuContent,
      MobileSidebar,
    },
  })
  export default class Navbar extends Vue {
    showSidebar = false;

    @Ref() sidebar!: MobileSidebar;

    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }

    menu = {
      play: {
        puzzles: '/puzzles',
        labs: '/labs',
        data: `${process.env.VUE_APP_API_BASE_URL}/web/labs/data-browser/`,
        'puzzle-maker': `${process.env.VUE_APP_API_BASE_URL}/game/puzzlemaker/`,
        'puzzle-maker-2-states': `${process.env.VUE_APP_API_BASE_URL}/game/switchmaker/2/`,
        'puzzle-maker-3-states': `${process.env.VUE_APP_API_BASE_URL}/game/switchmaker/3/`,
        scripts: `${process.env.VUE_APP_API_BASE_URL}/web/script/`,
      },
      learn: {
        'quick-help': '/help',
        guides: 'http://eternawiki.org/wiki/index.php5/Player-Created_Guides',
        wiki: 'http://eternawiki.org',
      },
      community: {
        leaderboards: '/players',
        forum: 'https://forum.eternagame.org',
        discord: 'https://discord.gg/KYeTwux',
        wiki: 'http://eternawiki.org',
        groups: `${process.env.VUE_APP_API_BASE_URL}/web/group/`,
      },
      news: '/news',
      about: {
        overview: '/about',
        publications: '/about/publications',
        software: '/about/software',
        eternacon: `/eternacon`,
        merch: `https://www.redbubble.com/people/eternagame/explore`,
        donate: 'https://challenges.eternagame.org/',
        terms: '/about/terms',
        'code-of-conduct': '/about/conduct',
      },
    };
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  // Hidden element on screen bottom right, to anchor the chat popover.
  .anchor {
    bottom: 0;
    right: 3rem;
    position: fixed;
    z-index: -3000;
    opacity: 0;
  }

  nav {
    border: 0px;
    height: 120px;
  }

  ::v-deep * {
    font-size: 13.125px;
  }

  ::v-deep .navbar-nav {
    text-transform: uppercase;
  }

  .toggler {
    cursor: pointer;
    width: 28px;
  }

  .navbar {
    @include media-breakpoint-up(xs) {
      padding: 0px;
    }
  }
</style>
