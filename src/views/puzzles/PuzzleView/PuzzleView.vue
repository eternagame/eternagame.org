<template>
  <EternaPage v-if="puzzle" :title="puzzle.title">
    <div class="page-content">
      <div class="d-flex flex-wrap " xs="12" sm="8">
        <div style="text-align:center" class="order-sm-2 col-sm-6">
          <div
            :style="{
              width: '334.0005px',
              height: '364.9995px',
              backgroundColor: '#041227',
              opacity: '0.8',
            }"
          >
            <img v-if="imageURL" :src="imageURL" />
          </div>
          <b-button type="submit" variant="primary" class="submit-button">
            {{ $t('puzzle-view:main-action') }}
          </b-button>
        </div>

        <div class="order-sm-1 col-sm-6">
          <hr class="top-border d-sm-none" />
          <div v-dompurify-html="puzzle.body" />
        </div>
      </div>
    </div>

    <template #sidebar="{ isInSidebar }">
      <SidebarPanel
        :isInSidebar="isInSidebar"
        :header="$t('puzzle-view:side-bar-header')"
        headerIcon="@/assets/info.svg"
      >
        <template #header-icon>
          <img src="@/assets/info.svg" />
        </template>
        <ul style="padding: 0; list-style-type:none">
          <li v-if="puzzle.reward">
            <img src="@/assets/dollar.svg" class="icon" />{{ puzzle.reward }}
          </li>
          <li v-if="puzzle.audience">
            <img src="@/assets/people.svg" class="icon" />{{ puzzle.num_cleared }}
          </li>
          <li v-if="puzzle.created">
            <img src="@/assets/calendar.svg" class="icon" />{{ puzzle.created }}
          </li>
        </ul>
      </SidebarPanel>
      <!-- <TagsPanel :tags="['#SRP', '#easy']" :isInSidebar="isInSidebar" /> -->
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
  import VueDOMPurifyHTML from 'vue-dompurify-html';
  import TagsPanel from '@/components/Sidebar/TagsPanel.vue';
  // @ts-ignore
  import get from 'lodash.get';
  import Utils from '@/utils/utils';
  import PuzzleData from './types';

  Vue.use(VueDOMPurifyHTML);

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
      SidebarPanel,
    },
  })
  export default class PuzzleView extends Mixins(PageDataMixin(fetchPageData)) {
    get puzzle() {
      return {
        ...get(this.pageData, 'puzzle'),
        quests: [
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/5ED5D090-6F62-4DF8-8C54-CC71306A4B16.png',
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/6A70A1E1-9A81-4BA0-B765-A12B8F821300.png',
          'https://cdn.zeplin.io/5e88563a3843011f95808b2f/assets/E280848F-6347-4CC5-A215-F08B1F55ED1B.png',
        ],
      };
    }

    get imageURL() {
      return Utils.getPuzzleMiddleThumbnail(get(this.pageData, 'nid', ''));
    }
  }
</script>

<style scoped lang="scss">
  .quest-image {
    margin: 15px;
  }
  .submit-button {
    margin-top: 15px;
  }
  h2 {
    font-size: 22px;
    font-weight: bold;
  }
  h3 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
  }
  p {
    font-size: 17px;
    line-height: 1.47;
  }

  .icon {
    margin-right: 10px;
    width: 20.4px;
    height: 20px;
    object-fit: contain;
  }

  li {
    margin-bottom: 20px;
  }
</style>
