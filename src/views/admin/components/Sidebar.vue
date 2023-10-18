<template>
  <section class="sidebar">
    <!-- <b-button v-b-toggle.nav>Toggle Sidebar</b-button>
    <b-sidebar id="nav" title="Eterna Admin" shadow visible> -->
      <header>
        <img
          src="@/assets/logomark_eterna.svg"
          alt="eterna logomark"
        />
        <h2>Eterna Admin</h2>
      </header>
      <b-nav vertical>
        <b-nav-item to="/admin" active>Dashboard</b-nav-item>
        <b-nav-item to="/admin/content">Content</b-nav-item>
        <b-nav-item to="/admin/User">Users</b-nav-item>
        <b-nav-item to="/admin/utilities">Utilities</b-nav-item>
      </b-nav>
    <!-- </b-sidebar> -->
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class Sidebar extends Vue {
    // get loggedIn() {
    //   return this.$vxm.user.loggedIn;
    // }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
  .sidebar {
    width: 300px;
    background-color: $primary;
  }

  header {    
    color: black;
    height: 100px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      height: 100%;
    }

    h2 {
      font-size: 1rem;
    }

    b-nav {
      width: 100%;
      
    }
  }

  a.nav-link {
    color: white;
    margin: 0px 16px;
    border-radius: 4px;

    &.active {
      background-color: #2f71c6;
    }

    &:hover {
      background-color: white;
      color: #2f71c6;
    }
  }
</style>
