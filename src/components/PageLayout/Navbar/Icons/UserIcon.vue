<template>
  <NavbarIcon>
    <template #icon>
      <img class="mr-1" src="@/assets/navbar/DefaultIcon.svg" />
      {{ username }}
    </template>
    <template #text> </template>

    <b-dropdown-item @click="redirect(profile)">
      {{ $t('user-dropdown:profile').toUpperCase() }}
    </b-dropdown-item>

    <b-dropdown-item @click="redirect('/account')">
      {{ $t('user-dropdown:edit-profile').toUpperCase() }}
    </b-dropdown-item>

    <b-dropdown-item @click="logout">
      {{ $t('user-dropdown:logout').toUpperCase() }}
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

    private get profile(): string {
      return `/players/${this.$vxm.user.uid}`;
    }

    redirect(path: string) {
      this.$router.push(path);
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
</style>
