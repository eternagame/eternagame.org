<template>
  <PlayerHome v-if="loggedIn" />
  <LandingPage v-else />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
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
  @import '@/styles/global.scss';

  .page {
    margin-top: $navbar-height;
  }
</style>
