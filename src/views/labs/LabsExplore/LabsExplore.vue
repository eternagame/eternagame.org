<template>
  <EternaPage v-if="data" title="Labs">
    <Gallery>
      <LabCard v-for="lab in data.labs" :key="lab.nid" :lab="lab"/>
    </Gallery>
    <template #sidebar>
      <FiltersPanel :filters="filters"/>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { RouteCallback, Route } from 'vue-router';
  import LabCard from './components/LabCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import LabsExploreData, { LabCardData } from './types';
  import FiltersPanel from './components/FiltersPanel.vue';

  @Component({
    components: {
      LabCard,
      SidebarPanel,
      EternaPage,
      FiltersPanel,
    },
  })
  export default class LabsExploreView extends Vue {
    data: LabsExploreData | null = null;

    async beforeRouteEnter(to: Route, from: Route, next: RouteCallback<LabsExploreView>) {
      const data = (await axios.get('/get/?type=get_labs_for_lab_cards&size=18&skip=0')).data.data as LabsExploreData;
      next((vm) => {
        vm.data = data;
      });
    }

    private filters = ['Active', 'Inactive'];
  }
</script>
