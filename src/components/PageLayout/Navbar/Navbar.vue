<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
    <b-container class="page-container px-4 d-flex justify-content-between">
      <EternaLogo />
      <div class="d-flex justify-content-end">
        <LoginRow v-if="!loggedIn" />
        <div class="d-none d-lg-block">
          <NavbarCollapseContent :menu="menu" />
        </div>
        <div class="icons-group">
          <NavbarIcons class="d-none d-md-inline-block d-lg-none icons-group" />
          <img
            src="@/assets/navbar/Toggler.svg"
            @click.stop="openSidebar"
            class="toggler d-inline-block d-lg-none"
          />
        </div>
        <MobileSidebar ref="sidebar">
          <SidebarMenuContent :menu="menu" />
        </MobileSidebar>
      </div>
    </b-container>
  </b-navbar>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
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
    burgerMenuOpen = false;

    $refs!: {
      sidebar: MobileSidebar;
    };

    openSidebar() {
      this.$refs.sidebar.openMenu();
    }

    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }

    menu = {
      play: {
        puzzles: '/puzzles',
        labs: '/labs',
        challenges: '/challenges',
        switches: '/switches',
      },
      learn: {
        guides: 'http://eternawiki.org/wiki/index.php5/Player-Created_Guides',
        practice: '/practice',
      },
      about: {
        publications: '/publications',
      },
      news: '/news',
      leaderboards: '/leaderboards',
    };
  }
</script>

<style lang="scss" scoped>
  nav {
    border: 0px;
    height: 120px;
  }

  ::v-deep * {
    font-size: 0.875rem;
  }

  ::v-deep .navbar-nav {
    text-transform: uppercase;
  }

  ::v-deep .icons-group > * {
    margin-left: 1.5rem;
  }

  .toggler {
    cursor: pointer;
    width: 28px;
  }
</style>
