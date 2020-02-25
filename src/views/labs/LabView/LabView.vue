<template>
  <EternaPage v-if="lab" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 3.5rem;"/>
    <LabRound v-for="round in lab.puzzles" :key="round.round" :round="round"/>
    <template #sidebar="{ isInSidebar }">
      <LabInfoPanel :lab="lab" :isInSidebar="isInSidebar"/>
      <TagsPanel :tags="['#Switch', '#Ribosome']" :isInSidebar="isInSidebar"/>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import LabDescription from './components/LabDescription.vue';
  import LabInfoPanel from './components/LabInfoPanel.vue';
  import LabRound from './components/LabRound.vue';
  import TagsPanel from './components/TagsPanel.vue';
  import LabViewData, { LabData } from './types';
  import PageDataMixin from '@/mixins/PageData';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=project&nid=${route.params.nid}`)).data.data as LabViewData;
  }

  @Component({
    components: {
      SidebarPanel,
      EternaPage,
      LabDescription,
      LabInfoPanel,
      LabRound,
      TagsPanel,
    },
  })
  export default class LabsView extends Mixins(PageDataMixin(fetchPageData)) {
    get lab() {
      return this.pageData?.lab;
    }
  }
</script>
