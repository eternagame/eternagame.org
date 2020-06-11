<template>
  <PlayerHome v-if="loggedIn" />
  <LandingPage v-else />
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import PlayerHome from './PlayerHome/PlayerHome.vue';
  import LandingPage from './LandingPage/LandingPage.vue';

  @Component({
    components: {
      PlayerHome,
      LandingPage
    },
  })
  export default class Home extends Vue {
    get loggedIn() {
      return this.$vxm.user.loggedIn;
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
