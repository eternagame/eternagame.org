<template>
  <NavbarIcon>
    <template #icon>
      <img class="mr-1" src="@/assets/navbar/DefaultIcon.svg" />
      {{ username }}
    </template>
    <template #text> </template>

    <b-dropdown-item :to="`/players/${$vxm.user.uid}`">
      {{ $t('user-dropdown:profile') }}
    </b-dropdown-item>

    <b-dropdown-item to="/account">
      {{ $t('user-dropdown:edit-profile') }}
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

  ::v-deep .dropdown .nav-link {
    background-color: $dark-blue;
  }

  ::v-deep a.dropdown-item {
    text-transform: uppercase;
  }
</style>
