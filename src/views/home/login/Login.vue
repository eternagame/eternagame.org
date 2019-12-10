<template>
  <div class="page">
    <VideoSection/>
    <DocsSection/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import VideoSection from './components/VideoSection.vue';
  import DocsSection from './components/DocsSection.vue';

  @Component({
    components: {
      SidebarPanel,
      EternaPage,
      VideoSection,
      DocsSection,
    },
  })
  export default class LoginView extends Vue {}
</script>

<style scoped lang="scss">
.page {
  margin-top: 120px;
}
</style>
