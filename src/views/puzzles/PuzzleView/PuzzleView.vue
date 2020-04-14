<template>
  <EternaPage v-if="pageData" :title="pageData.puzzle.title">
    <div class="page-content" v-html="pageData.puzzle.body"></div>

    <template #sidebar="{ isInSidebar }">
      <TagsPanel :tags="['#SRP', '#easy']" :isInSidebar="isInSidebar" />
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
  import PuzzleData from './types';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    const res = (
      await http.get(`/get/?type=puzzle&nid=${route.params.id}&script=-1`, {
        params: {
          order: route.query.sort,
          filters: route.query.filters && (route.query.filters as string).split(','),
        },
      })
    ).data.data as PuzzleData;
    return res;
  }

  @Component({
    components: {
      EternaPage,
      TagsPanel,
    },
  })
  export default class PuzzleView extends Mixins(PageDataMixin(fetchPageData)) {
    get puzzle() {
      return this.pageData;
    }
  }
</script>
