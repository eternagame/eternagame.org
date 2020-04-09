<template>
  <EternaPage v-if="lab" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 3.5rem;" />
    <LabRound v-for="round in lab.puzzles" :key="round.round" :round="round" />
    <template #sidebar="{ isInSidebar }">
      <LabInfoPanel :lab="lab" :isInSidebar="isInSidebar" />
      <TagsPanel :tags="['#Switch', '#Ribosome']" :isInSidebar="isInSidebar" />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return null;
  }

  @Component({
    components: {
      SidebarPanel,
      EternaPage,
      TagsPanel,
    },
  })
  export default class PuzzleView extends Mixins(PageDataMixin(fetchPageData)) {
    get lab() {
      return this.pageData;
    }
  }
</script>
