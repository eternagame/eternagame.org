<template>
  <EternaPage v-if="data" title="Lab Details">
    <LabDescription :lab="lab" style="margin-bottom: 3.5rem;"/>
    <LabRound v-for="round in lab.puzzles" :key="round.round" :round="round"/>
    <template #sidebar>
      <LabInfoPanel :lab="lab"/>
      <TagsPanel :tags="['#Switch', '#Ribosome']"/>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { RouteCallback, Route } from 'vue-router';
  import LabDescription from './components/LabDescription.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import LabViewData, { LabData } from './types';
  import LabInfoPanel from './components/LabInfoPanel.vue';
  import LabRound from './components/LabRound.vue';
  import TagsPanel from './components/TagsPanel.vue';

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
  export default class LabView extends Vue {
    data: LabViewData | null = null;

    get lab() {
      return this.data!.lab;
    }

    async beforeRouteEnter(to: Route, from: Route, next: RouteCallback<LabView>) {
      const data = (await axios.get(`/get/?type=project&nid=${to.params.nid}`)).data.data as LabViewData;
      next((vm) => {
        vm.data = data;
      });
    }
  }
</script>
