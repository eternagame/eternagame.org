<template>
  <PlayerHome v-if="loggedIn" />
  <div class="page" v-else>
    <VideoSection />
    <DocsSection />
    {{ user }}
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import PlayerHome from '@/views/home/PlayerHome.vue';
  import VideoSection from './components/VideoSection.vue';
  import DocsSection from './components/DocsSection.vue';

  @Component({
    components: {
      DocsSection,
      VideoSection,
      PlayerHome,
    },
  })
  export default class LandingPage extends Vue {
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
