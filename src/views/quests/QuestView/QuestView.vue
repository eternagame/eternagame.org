<template>
  <EternaPage title="Quest Info">
    <template #sidebar="{ isInSidebar }">
      <TagsPanel
        :tags="['#Switch', '#Ribosome', '##XOR', '#MS2', '#FMN', '#Telomerase']"
        :isInSidebar="isInSidebar"
      />
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
  import LabViewData, { LabData } from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=project&nid=${route.params.id}`)).data.data as LabViewData;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
    },
  })
  export default class LabView extends Mixins(PageDataMixin(fetchPageData)) {
    get lab() {
      return this.pageData?.lab;
    }
  }
</script>
