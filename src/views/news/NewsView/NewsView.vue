<template>
  <EternaPage v-if="news" title="News Detail">
    {{ news }}
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
  import NewsData from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(`/get/?type=news&nid=${route.params.id}&script=-1`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as NewsData;
    return res;
  }

  @Component({
    components: {
      SidebarPanel,
      EternaPage,
      TagsPanel,
    },
  })
  export default class NewsView extends Mixins(PageDataMixin(fetchPageData)) {
    get news() {
      return this.pageData;
    }
  }
</script>
