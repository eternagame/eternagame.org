<template>
  <EternaPage v-if="lab" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 3.5rem;"/>
    <LabRound v-for="round in lab.puzzles" :key="round.round" :round="round"/>
    <template #sidebar>
      <LabInfoPanel :lab="lab"/>
      <TagsPanel :tags="['#Switch', '#Ribosome']"/>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import LabDescription from './components/LabDescription.vue';
  import LabInfoPanel from './components/LabInfoPanel.vue';
  import LabRound from './components/LabRound.vue';
  import TagsPanel from './components/TagsPanel.vue';
  import LabViewData, { LabData } from './types';
  import PageDataMixin from '../../../mixins/PageData';

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
  export default class LabView extends Mixins(PageDataMixin) {
    get lab() {
      return (this.pageData as LabViewData)?.lab;
    }

    async fetchPageData(): Promise<any> {
      return (await this.$http.get(`/get/?type=project&nid=${this.$route.params.nid}`)).data.data as LabViewData;
    }
  }
</script>
