<template>
  <EternaPage
    v-if="pageData"
    title="OpenVaccine Round 3 Launch, Eterna Town Hall, Lightning Round + Round 2 Update"
    :header_date="news.news.created"
    :header_title="'announcements'.toUpperCase()"
  >
    <div class="page-content" v-dompurify-html="news.news.body"></div>

    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <CalendarPanel :isInSidebar="isInSidebar" />
      <TagsPanel :tags="['#Ribosome', '#Eternacon', '#Chat']" :isInSidebar="isInSidebar" />
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
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import NewsData from './types';
  import LabInfoPanel from '../../labs/LabView/components/LabInfoPanel.vue';

  Vue.use(VueDOMPurifyHTML);

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
      CalendarPanel,
      LabInfoPanel,
      SidebarPanel,
      EternaPage,
      TagsPanel,
      DropdownSidebarPanel,
    },
  })
  export default class NewsView extends Mixins(PageDataMixin(fetchPageData)) {
    get news() {
      return this.pageData;
    }

    private options: Option[] = [
      { value: 'categories', text: 'All Categories' },
      { value: 'announcements', text: 'Announcements' },
      { value: 'blog', text: 'Blog' },
      { value: 'labs', text: 'Labs' },
    ];
  }
</script>
