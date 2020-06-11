<template>
  <EternaPage
    :title="title"
    :header_date="created"
    :header_title="$t('news-view:anouncements')"
  >
    <div v-if="fetchState.firstFetchComplete">
      <div class="page-content" v-dompurify-html="body"></div>
      <Comments :comments="comments" :nid="nid" />
    </div>
    <div v-else>
      <Preloader />
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
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import CalendarPanel from '@/components/Sidebar/CalendarPanel.vue';
  import Comments from '@/components/PageLayout/Comments.vue';
  import EditField from '@/components/Common/EditField.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import { CommentItem, NewsArticle } from '@/types/common-types';
  import FetchMixin from '@/mixins/FetchMixin';

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
  export default class NewsView extends Mixins(FetchMixin) {
    nid: string | null = null;

    title: string = '';

    body: string = '';

    created: string = '';

    comments: CommentItem[] = [];

    async fetch() {
      const res = (
        await this.$http.get(`/get/?type=news&nid=${this.$route.params.id}`, {
          params: {
            order: this.$route.query.sort,
            filters: this.$route.query.filters && (this.$route.query.filters as string).split(','),
          },
        })
      ).data.data as {news: NewsArticle, comments: CommentItem[]};

      this.nid = res.news.nid;
      this.title = res.news.title;
      this.body = res.news.body;
      this.created = res.news.created;
      this.comments = res.comments;
    }

    private options: Option[] = [
      { value: 'categories', text: 'news-view:option-categories' },
      { value: 'announcements', text: 'news-view:option-announcements' },
      { value: 'blog', text: 'news-view:option-blog' },
    ];
  }
</script>

<style lang="scss" scoped>
  .page-content {
    white-space: pre-wrap;
    padding: 1.5rem;
  }
</style>
