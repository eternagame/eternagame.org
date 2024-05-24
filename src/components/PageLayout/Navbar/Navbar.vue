<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" class="navbar">
    <b-container class="page-container px-4 d-flex justify-content-between">
      <EternaLogo />
      <p id="chat-popover-anchor" class="anchor">.</p>

      <div class="d-flex justify-content-end">
        <div class="d-none d-lg-block">
          <NavbarCollapseContent :menu="menu" />
        </div>
        <div class="d-flex">
          <NavbarIcons class="d-none d-md-inline-block d-lg-none" v-if="loggedIn" />
          <LoginRow class="d-none d-md-inline-block d-lg-none mr-2" v-else />
          <img
            src="@/assets/navbar/Toggler.svg"
            @click.stop="showSidebar = true"
            @keypress.enter="showSidebar = true"
            @keypress.space="showSidebar = true"
            class="toggler d-inline-block d-lg-none"
            alt="Open menu"
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
  import { Component, Vue, Ref } from 'vue-property-decorator';
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
      home: '/',
      play: {
        puzzles: '/puzzles',
        labs: '/labs',
        challenges: '/challenges',
        collections: '/collections',
        data: '/labs/data-browser/',
        'puzzle-maker': `/puzzles/create`,
        'puzzle-maker-2-states': '/puzzles/create?states=2',
        'puzzle-maker-3-states': '/puzzles/create?states=3',
        scripts: `/scripts`,
      },
      learn: {
        'quick-help': '/help',
        'gamer-guide': '/gamerguide',
        guides: 'http://eternawiki.org/wiki/index.php5/Player-Created_Guides',
        wiki: 'http://eternawiki.org',
      },
      community: {
        leaderboards: '/players',
        eternacon: `/eternacon`,
        calendar: '/calendar',
        forum: 'https://forum.eternagame.org',
        discord: 'https://discord.gg/KYeTwux',
        wiki: 'http://eternawiki.org',
        groups: `/groups`,
        'code-of-conduct': '/conduct',
        epa: `/epa`,
      },
      news: '/news',
      about: {
        overview: '/about',
        publications: '/publications',
        tech: '/tech',
        forEducators: '/edu',
        forResearchers: '/researchers',
        merch: `https://www.redbubble.com/people/eternagame/explore`,
        donate: '/donate',
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
    height: $navbar-height;
  }

  :deep(*) {
    font-size: 13.125px;
  }

  :deep(.navbar-nav) {
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
