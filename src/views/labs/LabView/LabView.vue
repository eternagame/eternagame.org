<template>
  <EternaPage v-if="lab" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 52.5px;" />
    <LabRound v-for="round in lab.puzzles" :key="round.round" :round="round" />
    <template #sidebar="{ isInSidebar }">
      <LabInfoPanel :lab="lab" :isInSidebar="isInSidebar" />
      <!-- <TagsPanel :tags="['#Switch', '#Ribosome']" :isInSidebar="isInSidebar" /> -->
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import LabDescription from './components/LabDescription.vue';
  import LabInfoPanel from './components/LabInfoPanel.vue';
  import LabRound from './components/LabRound.vue';
  import LabViewData, { LabData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=project&nid=${route.params.id}`)).data.data as LabViewData;
  }

  @Component({
    components: {
      EternaPage,
      LabDescription,
      LabInfoPanel,
      LabRound,
      TagsPanel,
    },
  })
  export default class LabView extends Mixins(PageDataMixin(fetchPageData)) {
    get lab() {
      return this.pageData?.lab;
    }
  }
</script>
