<template>
  <nav>
    <b-navbar-nav v-if="loggedIn">
      <div class="w-100">
        <NavbarIcons class="d-inline d-md-none" :isInSideBar="true" />
      </div>
    </b-navbar-nav>
    <LoginRow :isInSideBar="true" v-else />
    <hr class="d-lg-none sidebar-separator" />
    <b-navbar-nav>
      <SidebarMenuItem
        v-for="([text, value], index) in menuEntries"
        :key="text"
        :value="value"
        :text="text"
        :index="index"
        accordion="navbar-sidebar-accordion"
      />
    </b-navbar-nav>
  </nav>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import NavbarIcons from '../Icons/NavbarIcons.vue';
  import SidebarMenuItem from './SidebarMenuItem.vue';
  import LoginRow from '../NavbarMenu/Login/LoginRow.vue';

  @Component({
    components: {
      SidebarMenuItem,
      NavbarIcons,
      LoginRow,
    },
  })
  export default class SidebarMenuContent extends Vue {
    @Prop({ required: true }) menu!: {
      [text: string]: { [text: string]: string } | string;
    };

    get menuEntries() {
      return Object.entries(this.menu);
    }

    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }
  }
</script>

<style lang="scss" scoped>
  hr.sidebar-separator {
    border-color: var(--gray-dark);
    border-width: 2px;
  }
</style>
