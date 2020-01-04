<template>
  <EternaPage v-if="labsData" title="Labs">
    <Gallery>
      <LabCard v-for="lab in labsData.labs" :key="lab.nid" :lab="lab"/>
    </Gallery>
    <template #sidebar>
      <FiltersPanel :filters="filters" paramName="filters"/>
      <DropdownSidebarPanel :options="options" paramName="sort" replace/>
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Mixins,
  } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import LabCard from './components/LabCard.vue';
  import SidebarPanel from '@/components/Sidebar/SidebarPanel.vue';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import LabsExploreData, { LabCardData } from './types';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '../../../mixins/PageData';

  @Component({
    components: {
      LabCard,
      SidebarPanel,
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
    },
  })
  export default class LabsExploreView extends Mixins(PageDataMixin) {
    dynamicData: LabsExploreData | null = null;

    get labsData(): LabsExploreData {
      return this.dynamicData ?? this.pageData as LabsExploreData;
    }

    async query(route: Route) {
      const { sort } = route.query;
      return (await this.$http.get('/get/?type=get_labs_for_lab_cards&size=18&skip=0', {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })).data.data as LabsExploreData;
    }

    async fetchPageData(): Promise<any> {
      return this.query(this.$route);
    }

    async beforeRouteUpdate(to: Route, from: Route, next: RouteCallback<LabsExploreView>) {
      const data = await this.query(to);
      this.dynamicData = data;
      next();
    }

    private filters: Filter[] = [{ value: 'active', text: 'Active' }, { value: 'inactive', text: 'Inactive' }];

    private options: Option[] = [{ value: 'desc', text: 'Newest First' }, { value: 'asc', text: 'Oldest First' }];
  }
</script>
