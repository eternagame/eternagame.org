<template>
  <div class="page">
    <VideoSection/>
    <DocsSection/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { RouteCallback, Route } from 'vue-router';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageFooter from '@/components/PageLayout/PageFooter.vue';
  import VideoSection from './components/VideoSection.vue';
  import DocsSection from './components/DocsSection.vue';

  @Component({
    components: {
      DocsSection,
      VideoSection,
    },
  })
  export default class FrontPage extends Vue {
  }
</script>

<style lang="scss" scoped>
  .page {
    margin-top: 120px;
  }
</style>
