<template>
  <EternaPage
    :title="pageData ? news.news.title : ''"
    :header_date="pageData ? news.news.created : ''"
    :header_title="'announcements'.toUpperCase()"
  >
    <div v-if="pageData">
      <div class="page-content" v-dompurify-html="news.news.body"></div>
      <Comments :comments="pageData.comments" :pathname="addCommentPath" />
    </div>
    <div v-else>
      <Preloader/>
    </div>

    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
      <CalendarPanel :isInSidebar="isInSidebar" />
      <!-- <TagsPanel :tags="['#Ribosome', '#Eternacon', '#Chat']" :isInSidebar="isInSidebar" /> -->
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
  import Comments from '@/components/PageLayout/Comments.vue';
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import EditField from '@/components/Common/EditField.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import NewsData from './types';

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
      EditField,
      CalendarPanel,
      SidebarPanel,
      EternaPage,
      TagsPanel,
      DropdownSidebarPanel,
      Comments,
      Preloader,
    },
  })
  export default class NewsView extends Mixins(PageDataMixin(fetchPageData)) {
    get news() {
      return this.pageData;
    }

    get addCommentPath() {
      return `/web/blog/${this.pageData.news.nid}`;
    }

    private options: Option[] = [
      { value: 'categories', text: 'news-view:option-categories' },
      { value: 'announcements', text: 'news-view:option-announcements' },
      { value: 'blog', text: 'news-view:option-blog' },
      { value: 'labs', text: 'news-view:option-labs' },
    ];
  }
</script>

<style lang="scss" scoped>
.page-content {
  white-space: pre-wrap;
  padding: 1.5rem;
}
</style>
