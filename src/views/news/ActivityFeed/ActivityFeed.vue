<template>
  <EternaPage :title="$t('activity-feed:title')">
    <div v-if="news.length">
      <MessageCompose @submit-message="sentMessage" />
      <Gallery :sm="12" :md="12" style="margin-top:25px">
        <ActivityCard v-for="article in news" :key="article.nid" :article="article" />
      </Gallery>
      <Pagination :key="news.length" />
    </div>
    <div v-else>
      <Preloader />
    </div>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import axios, { AxiosInstance } from 'axios';
  // @ts-ignore
  import get from 'lodash.get';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import FiltersPanel, { Filter } from '@/components/Sidebar/FiltersPanel.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  import Pagination from '@/components/PageLayout/Pagination.vue';
  import Preloader from '@/components/PageLayout/Preloader.vue';
  import Utils from '@/utils/utils';
  import ActivityCard from './components/ActivityCard.vue';
  import MessageCompose from './components/MessageCompose.vue';

  const INITIAL_NUMBER = 18;

  const ROUTE = '/get/?type=newsfeed&combined=true&filter=all';

  @Component({
    components: {
      EternaPage,
      FiltersPanel,
      DropdownSidebarPanel,
      TagsPanel,
      ActivityCard,
      Pagination,
      Preloader,
      MessageCompose,
    },
  })
  export default class ActivityFeed extends Vue {
    news = [];

    async fetchData() {
      const { sort } = this.$route.query;
      const res = (
        await axios.get(`${ROUTE}&size=${INITIAL_NUMBER}`, {
          params: {
            size: this.$route.query.size || INITIAL_NUMBER,
          },
        })
      ).data.data;
      this.news = res.entries;
    }

    mounted() {
      this.fetchData();
    }

    sentMessage() {
      this.fetchData();
    }
  }
</script>
