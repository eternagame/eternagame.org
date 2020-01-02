<template>
  <EternaPage v-if="data" title="Labs">
    <Gallery>
      <LabCard v-for="lab in data.labs" :key="lab.nid" :lab="lab"/>
    </Gallery>
    <template #sidebar>
      <FiltersPanel :filters="filters" paramName="filters"/>
      <DropdownSidebarPanel :options="options" paramName="sort" replace/>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { RouteCallback, Route } from 'vue-router';
  import LabCard from './components/LabCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import LabsExploreData, { LabCardData } from './types';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';

  @Component({
    components: {
      LabCard,
      SidebarPanel,
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
    },
  })
  export default class LabsExploreView extends Vue {
    data: LabsExploreData | null = null;

    static async query(route: Route) {
      const { sort } = route.query;
      return (await axios.get('/get/?type=get_labs_for_lab_cards&size=18&skip=0', {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })).data.data as LabsExploreData;
    }

    async beforeRouteEnter(to: Route, from: Route, next: RouteCallback<LabsExploreView>) {
      const data = await LabsExploreView.query(to);
      next((vm) => {
        vm.data = data;
      });
    }

    async beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<LabsExploreView>) {
      const data = await LabsExploreView.query(to);
      this.data = data;
      next();
    }

    private filters: Filter[] = [{ value: 'active', text: 'Active' }, { value: 'inactive', text: 'Inactive' }];

    private options: Option[] = [{ value: 'desc', text: 'Newest First' }, { value: 'asc', text: 'Oldest First' }];
  }
</script>
