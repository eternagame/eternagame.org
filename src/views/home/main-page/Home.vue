<template>
  <EternaPage>
    <PuzzlesGallery/>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { RouteCallback, Route } from 'vue-router';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PuzzlesGallery from './components/PuzzlesGallery.vue';

  @Component({
    components: {
      EternaPage,
      PuzzlesGallery,
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
