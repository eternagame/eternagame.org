<template>
  <NavbarIcon>
    <template #icon>
      <img src="@/assets/navbar/DefaultIcon.svg" :alt="$t('nav-bar:notifications')" />
      {{ username }}
    </template>
    <template #text>
      {{ $t('nav-bar:notifications') }}
    </template>

    <b-dropdown-item>
      <router-link class="d-flex" to="/account">{{ $t('user-dropdown:edit-profile') }}</router-link>
    </b-dropdown-item>

    <b-dropdown-item @click="logout">
      {{ $t('user-dropdown:logout') }}
    </b-dropdown-item>
  </NavbarIcon>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import NavbarIcon from './NavbarIcon.vue';

  @Component({
    components: { NavbarIcon },
  })
  export default class UserIcon extends Vue {
    logout() {
      this.$vxm.user.logout();
    }

    get username() {
      return this.$vxm.user.username;
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
